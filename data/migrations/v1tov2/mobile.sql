CREATE SCHEMA gn_synchronomade;

----------
--TABLES--
----------

CREATE TABLE gn_synchronomade.erreurs_flora (
    id serial NOT NULL,
    json text,
    date_import date
);

CREATE TABLE gn_synchronomade.erreurs_occtax
(
  id serial NOT NULL,
  json text,
  date_import date
);


----------------
--PRIMARY KEYS--
----------------
ALTER TABLE ONLY gn_synchronomade.erreurs_flora ADD CONSTRAINT erreurs_flora_pkey PRIMARY KEY (id);
ALTER TABLE ONLY gn_synchronomade.erreurs_occtax ADD CONSTRAINT erreurs_occtax_pkey PRIMARY KEY (id);


---------
--VIEWS--
---------
CREATE OR REPLACE VIEW gn_synchronomade.v_color_taxon_area
AS SELECT b.id_nom,
    c.id_area,
    c.nb_obs,
    c.last_date,
        CASE
            WHEN date_part('day'::text, now() - c.last_date::timestamp with time zone) < 365::double precision THEN 'grey'::text
            ELSE 'red'::text
        END AS color
   FROM gn_synthese.cor_area_taxon c
   JOIN taxonomie.bib_noms b on b.cd_nom = c.cd_nom;

-- Recréation des vues qui sont devenues des tables (pour assurer l'évolution - si on ajoute des taxons ou des observateur)
CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_taxons_faune
AS 
SELECT DISTINCT n.id_nom,
    taxonomie.find_cdref(n.cd_nom) AS cd_ref,
    n.cd_nom,
    tx.lb_nom AS nom_latin,
    n.nom_francais,
    cnl.id_liste as id_classe,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[61098, 61119, 61000]) THEN 6
            ELSE 5
        END AS denombrement,
    f2.bool AS patrimonial,
    m.texte_message_cf AS message,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[60577, 60612]) THEN false
            ELSE true
        END AS contactfaune,
    true AS mortalite
   FROM taxonomie.bib_noms n
     LEFT JOIN v1_compat.cor_message_taxon_contactfaune cmt ON cmt.id_nom = n.id_nom
     LEFT JOIN v1_compat.bib_messages_cf m ON m.id_message_cf = cmt.id_message_cf
     LEFT JOIN taxonomie.cor_taxon_attribut cta ON cta.cd_ref = n.cd_ref
     JOIN taxonomie.cor_nom_liste cnl ON cnl.id_nom = n.id_nom and cnl.id_liste in (1, 11, 12, 13, 14)
     join taxonomie.cor_nom_liste cnl_500 on cnl_500.id_nom = n.id_nom and cnl_500.id_liste = 500
    -- join taxonomie.bib_listes bib on bib.id_liste = cnl.id_liste 
     --JOIN v1_compat.v_nomade_classes g ON g.id_classe = cnl.id_liste
     JOIN taxonomie.taxref tx ON tx.cd_nom = n.cd_nom and tx.phylum = 'Chordata'
     JOIN v1_compat.cor_boolean f2 ON f2.expression::text = cta.valeur_attribut AND cta.id_attribut = 1
  ORDER BY n.id_nom, taxonomie.find_cdref(n.cd_nom), tx.lb_nom, n.nom_francais, cnl.id_liste, f2.bool, m.texte_message_cf;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_taxons_flore
AS 
SELECT DISTINCT n.id_nom,
    taxonomie.find_cdref(n.cd_nom) AS cd_ref,
    n.cd_nom,
    tx.lb_nom AS nom_latin,
    n.nom_francais,
    cnl.id_liste as id_classe,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[61098, 61119, 61000]) THEN 6
            ELSE 5
        END AS denombrement,
    f2.bool AS patrimonial,
    m.texte_message_cflore AS message,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[60577, 60612]) THEN false
            ELSE true
        END AS contactfaune,
    true AS mortalite
   FROM taxonomie.bib_noms n
     LEFT JOIN v1_compat.cor_message_taxon_cflore cmt ON cmt.id_nom = n.id_nom
     LEFT JOIN v1_compat.bib_messages_cflore m ON m.id_message_cflore = cmt.id_message_cflore
     LEFT JOIN taxonomie.cor_taxon_attribut cta ON cta.cd_ref = n.cd_ref
     JOIN taxonomie.cor_nom_liste cnl ON cnl.id_nom = n.id_nom and cnl.id_liste > 300 AND cnl.id_liste < 400
     join taxonomie.cor_nom_liste cnl_500 on cnl_500.id_nom = n.id_nom and cnl_500.id_liste = 500
    -- join taxonomie.bib_listes bib on bib.id_liste = cnl.id_liste 
     --JOIN v1_compat.v_nomade_classes g ON g.id_classe = cnl.id_liste
     JOIN taxonomie.taxref tx ON tx.cd_nom = n.cd_nom and tx.regne = 'Plantae'
     JOIN v1_compat.cor_boolean f2 ON f2.expression::text = cta.valeur_attribut AND cta.id_attribut = 1
  ORDER BY n.id_nom, taxonomie.find_cdref(n.cd_nom), tx.lb_nom, n.nom_francais, cnl.id_liste, f2.bool, m.texte_message_cflore;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_taxons_inv
AS 
SELECT DISTINCT n.id_nom,
    taxonomie.find_cdref(n.cd_nom) AS cd_ref,
    n.cd_nom,
    tx.lb_nom AS nom_latin,
    n.nom_francais,
    cnl.id_liste as id_classe,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[61098, 61119, 61000]) THEN 6
            ELSE 5
        END AS denombrement,
    f2.bool AS patrimonial,
    m.texte_message_inv AS message,
        CASE
            WHEN tx.cd_nom = ANY (ARRAY[60577, 60612]) THEN false
            ELSE true
        END AS contactfaune,
    true AS mortalite
   FROM taxonomie.bib_noms n
     LEFT JOIN v1_compat.cor_message_taxon_contactinv cmt ON cmt.id_nom = n.id_nom
     LEFT JOIN v1_compat.bib_messages_inv m ON m.id_message_inv = cmt.id_message_inv
     LEFT JOIN taxonomie.cor_taxon_attribut cta ON cta.cd_ref = n.cd_ref
     JOIN taxonomie.cor_nom_liste cnl ON cnl.id_nom = n.id_nom and cnl.id_liste IN (2, 5, 8, 9, 10, 15, 16)
     join taxonomie.cor_nom_liste cnl_500 on cnl_500.id_nom = n.id_nom and cnl_500.id_liste = 500
    -- join taxonomie.bib_listes bib on bib.id_liste = cnl.id_liste 
     --JOIN v1_compat.v_nomade_classes g ON g.id_classe = cnl.id_liste
     JOIN taxonomie.taxref tx ON tx.cd_nom = n.cd_nom and tx.phylum = 'Chordata'
     JOIN v1_compat.cor_boolean f2 ON f2.expression::text = cta.valeur_attribut AND cta.id_attribut = 1
  ORDER BY n.id_nom, taxonomie.find_cdref(n.cd_nom), tx.lb_nom, n.nom_francais, cnl.id_liste, f2.bool, m.texte_message_inv;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_observateurs_inv
AS SELECT DISTINCT r.id_role,
    r.nom_role,
    r.prenom_role
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 11))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 11 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY r.nom_role, r.prenom_role, r.id_role;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_observateurs_faune
AS SELECT DISTINCT r.id_role,
    r.nom_role,
    r.prenom_role
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 11))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 11 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY r.nom_role, r.prenom_role, r.id_role;

-- recréation des vue "critere". Pdt la migrations, les vues ont été transformés en table, celles pose des problèmes de droits car elles s'appuyent sur des tables qui n'existe plus.
DROP foreign table v1_compat.v_nomade_criteres_cf;
DROP foreign table v1_compat.v_nomade_criteres_inv;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_criteres_cf
AS SELECT c.id_critere_cf,
    c.nom_critere_cf,
    c.tri_cf,
    ccl.id_liste AS id_classe
   FROM v1_compat.bib_criteres_cf c
     JOIN v1_compat.cor_critere_liste ccl ON ccl.id_critere_cf = c.id_critere_cf
  ORDER BY ccl.id_liste, c.tri_cf;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_criteres_inv
AS SELECT c.id_critere_inv,
    c.nom_critere_inv,
    c.tri_inv
   FROM v1_compat.bib_criteres_inv c
  ORDER BY c.tri_inv;

CREATE OR REPLACE VIEW gn_synchronomade.v_nomade_milieux_inv
AS SELECT b.id_milieu_inv,
    b.nom_milieu_inv
   FROM v1_compat.bib_milieux_inv b
  ORDER BY b.id_milieu_inv;

-- recréation de la vue recherche_mobile
CREATE OR REPLACE VIEW gn_synchronomade.v_mobile_recherche
AS ( SELECT ap.indexap AS gid,
    zp.dateobs,
    t.latin AS taxon,
    o.observateurs,
    st_asgeojson(st_transform(ap.the_geom_local, 4326)) AS geom_4326,
    st_x(st_transform(st_centroid(ap.the_geom_local), 4326)) AS centroid_x,
    st_y(st_transform(st_centroid(ap.the_geom_local), 4326)) AS centroid_y
   FROM v1_florepatri.t_apresence ap
     JOIN v1_florepatri.t_zprospection zp ON ap.indexzp = zp.indexzp
     JOIN v1_florepatri.bib_taxons_fp t ON t.cd_nom = zp.cd_nom
     JOIN ( SELECT c.indexzp,
            array_to_string(array_agg((r.prenom_role::text || ' '::text) || r.nom_role::text), ', '::text) AS observateurs
           FROM v1_florepatri.cor_zp_obs c
             JOIN utilisateurs.t_roles r ON r.id_role = c.codeobs
          GROUP BY c.indexzp) o ON o.indexzp = ap.indexzp
  WHERE ap.supprime = false AND st_isvalid(ap.the_geom_local) AND ap.topo_valid = true
  ORDER BY zp.dateobs DESC)
UNION
( SELECT cft.id_station AS gid,
    s.dateobs,
    t.latin AS taxon,
    o.observateurs,
    st_asgeojson(st_transform(s.the_geom_3857, 4326)) AS geom_4326,
    st_x(st_transform(st_centroid(s.the_geom_3857), 4326)) AS centroid_x,
    st_y(st_transform(st_centroid(s.the_geom_3857), 4326)) AS centroid_y
   FROM v1_florestation.cor_fs_taxon cft
     JOIN v1_florestation.t_stations_fs s ON s.id_station = cft.id_station
     JOIN v1_florepatri.bib_taxons_fp t ON t.cd_nom = cft.cd_nom
     JOIN ( SELECT c.id_station,
            array_to_string(array_agg((r.prenom_role::text || ' '::text) || r.nom_role::text), ', '::text) AS observateurs
           FROM v1_florestation.cor_fs_observateur c
             JOIN utilisateurs.t_roles r ON r.id_role = c.id_role
          GROUP BY c.id_station) o ON o.id_station = cft.id_station
  WHERE cft.supprime = false AND st_isvalid(s.the_geom_3857)
  ORDER BY s.dateobs DESC);


---------------
--IMPORT DATA--
---------------
IMPORT FOREIGN SCHEMA synchronomade FROM SERVER geonature1server INTO v1_compat;
INSERT INTO gn_synchronomade.erreurs_occtax (json, date_import) SELECT json, date_import FROM v1_compat.erreurs_cf;
INSERT INTO gn_synchronomade.erreurs_occtax (json, date_import) SELECT json, date_import FROM v1_compat.erreurs_inv;
INSERT INTO gn_synchronomade.erreurs_occtax (json, date_import) SELECT json, date_import FROM v1_compat.erreurs_mortalite;
INSERT INTO gn_synchronomade.erreurs_flora (json, date_import) SELECT json, date_import FROM v1_compat.erreurs_flora;
