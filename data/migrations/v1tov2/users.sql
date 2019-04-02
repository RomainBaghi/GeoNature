IMPORT FOREIGN SCHEMA utilisateurs FROM SERVER geonature1server INTO v1_compat;

-- recréer bib_unités et id_unite

CREATE TABLE IF NOT EXISTS utilisateurs.bib_unites (
    nom_unite character varying(50) NOT NULL,
    adresse_unite character varying(128),
    cp_unite character varying(5),
    ville_unite character varying(100),
    tel_unite character varying(14),
    fax_unite character varying(14),
    email_unite character varying(100),
    id_unite integer NOT NULL
);

ALTER TABLE utilisateurs.t_roles 
ADD COLUMN id_unite INTEGER;


TRUNCATE utilisateurs.t_roles CASCADE;
--NOTICE:  truncate cascades to table "cor_role_menu"
--NOTICE:  truncate cascades to table "cor_roles"
--NOTICE:  truncate cascades to table "cor_role_droit_application"
--NOTICE:  truncate cascades to table "cor_role_tag"
--NOTICE:  truncate cascades to table "cor_app_privileges"
--NOTICE:  truncate cascades to table "cor_acquisition_framework_actor"
--NOTICE:  truncate cascades to table "cor_dataset_actor"
--NOTICE:  truncate cascades to table "t_validations"
--NOTICE:  truncate cascades to table "synthese"
--NOTICE:  truncate cascades to table "t_base_sites"
--NOTICE:  truncate cascades to table "t_base_visits"
--NOTICE:  truncate cascades to table "cor_visit_observer"
--NOTICE:  truncate cascades to table "t_releves_occtax"
--NOTICE:  truncate cascades to table "cor_role_releves_occtax"
--NOTICE:  truncate cascades to table "cor_role_fiche_cf"
--NOTICE:  truncate cascades to table "cor_area_synthese"
--NOTICE:  truncate cascades to table "cor_site_application"
--NOTICE:  truncate cascades to table "cor_site_area"
--NOTICE:  truncate cascades to table "t_occurrences_occtax"
--NOTICE:  truncate cascades to table "cor_counting_occtax"

TRUNCATE utilisateurs.t_listes CASCADE;
--NOTICE:  truncate cascades to table "cor_role_liste"

TRUNCATE utilisateurs.t_applications CASCADE;
--NOTICE:  truncate cascades to table "cor_profil_for_app"
--NOTICE:  truncate cascades to table "cor_role_app_profil"
--NOTICE:  truncate cascades to table "cor_application_nomenclature"
DELETE FROM utilisateurs.bib_organismes WHERE id_organisme > 0;

-- récupérer les données
INSERT INTO utilisateurs.bib_organismes(
  nom_organisme,
  adresse_organisme,
  cp_organisme,
  ville_organisme,
  tel_organisme,
  fax_organisme,
  email_organisme,
  id_organisme,
  uuid_organisme,
  id_parent
)
SELECT   
  nom_organisme,
  adresse_organisme,
  cp_organisme,
  ville_organisme,
  tel_organisme,
  fax_organisme,
  email_organisme,
  id_organisme,
  uuid_organisme,
  id_parent FROM v1_compat.bib_organismes WHERE id_organisme NOT IN (SELECT id_organisme FROM utilisateurs.bib_organismes);


INSERT INTO utilisateurs.bib_unites(
  nom_unite,
  adresse_unite,
  cp_unite,
  ville_unite,
  tel_unite,
  fax_unite,
  email_unite,
  id_unite
)
SELECT   
  nom_unite,
  adresse_unite,
  cp_unite,
  ville_unite,
  tel_unite,
  fax_unite,
  email_unite,
  id_unite FROM v1_compat.bib_unites WHERE id_unite NOT IN (SELECT id_unite FROM utilisateurs.bib_unites);

INSERT INTO utilisateurs.t_roles (
    groupe,
    id_role,
    identifiant,
    nom_role,
    prenom_role,
    desc_role,
    pass,
    email,
    id_organisme,
    id_unite,
    remarques,
    pn,
    session_appli,
    date_insert,
    date_update,
    uuid_role,
    pass_plus
)
SELECT 
    groupe,
    id_role,
    identifiant,
    nom_role,
    prenom_role,
    desc_role,
    pass,
    email,
    id_organisme,
    id_unite,
    remarques,
    pn,
    session_appli,
    date_insert,
    date_update,
    uuid_role,
    pass_plus
 FROM v1_compat.t_roles WHERE id_role NOT IN(SELECT id_role FROM utilisateurs.t_roles);

-- creation uuid si NULL
UPDATE utilisateurs.t_roles
SET uuid_role = uuid_generate_v4()()
WHERE uuid_role IS NULL;

INSERT INTO utilisateurs.cor_roles (id_role_groupe, id_role_utilisateur)
SELECT * FROM v1_compat.cor_roles;

INSERT INTO utilisateurs.t_applications (id_application, nom_application, desc_application,code_application, id_parent)
SELECT id_application, nom_application, desc_application, code_application, id_parent FROM v1_compat.t_applications
WHERE id_application NOT in (SELECT id_application FROM utilisateurs.t_applications);

INSERT INTO utilisateurs.t_listes(id_liste, code_liste, nom_liste, desc_liste)
SELECT * FROM v1_compat.t_listes;

INSERT INTO utilisateurs.cor_role_liste (id_role, id_liste)
SELECT * FROM v1_compat.cor_role_liste;

INSERT INTO utilisateurs.cor_profil_for_app (id_profil, id_application)
SELECT * FROM v1_compat.cor_profil_for_app;

INSERT INTO utilisateurs.cor_role_app_profil (id_role, id_application, id_profil)
SELECT * FROM v1_compat.cor_role_app_profil;


-- vue

CREATE OR REPLACE VIEW utilisateurs.bib_droits AS 
 SELECT t_profils.id_profil AS id_droit,
    t_profils.nom_profil AS nom_droit,
    t_profils.desc_profil AS desc_droit
   FROM utilisateurs.t_profils
  WHERE t_profils.id_profil <= 6;

CREATE OR REPLACE VIEW utilisateurs.cor_role_droit_application AS 
 SELECT crap.id_role,
    crap.id_profil AS id_droit,
    crap.id_application
   FROM utilisateurs.cor_role_app_profil crap
     JOIN utilisateurs.t_roles r ON r.id_role = crap.id_role AND r.active = true;

CREATE OR REPLACE VIEW utilisateurs.cor_role_menu AS 
 SELECT DISTINCT crl.id_role,
    crl.id_liste AS id_menu
   FROM utilisateurs.cor_role_liste crl
     JOIN utilisateurs.t_roles r ON r.id_role = crl.id_role AND r.active = true;

CREATE OR REPLACE VIEW utilisateurs.t_menus AS 
 SELECT t_listes.id_liste AS id_menu,
    t_listes.nom_liste AS nom_menu,
    t_listes.desc_liste AS desc_menu,
    NULL::integer AS id_application
   FROM utilisateurs.t_listes;

CREATE OR REPLACE VIEW utilisateurs.v_nomade_observateurs_all AS 
( SELECT DISTINCT r.id_role,
    r.nom_role,
    r.prenom_role,
    'fauna'::text AS mode
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 11))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 11 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY r.nom_role, r.prenom_role, r.id_role)
UNION
( SELECT DISTINCT r.id_role,
    r.nom_role,
    r.prenom_role,
    'flora'::text AS mode
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 5))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 5 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY r.nom_role, r.prenom_role, r.id_role)
UNION
( SELECT DISTINCT r.id_role,
    r.nom_role,
    r.prenom_role,
    'inv'::text AS mode
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 11))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 11 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY r.nom_role, r.prenom_role, r.id_role);


CREATE OR REPLACE VIEW utilisateurs.v_observateurs AS 
 SELECT DISTINCT r.id_role AS codeobs,
    (r.nom_role::text || ' '::text) || r.prenom_role::text AS nomprenom
   FROM utilisateurs.t_roles r
  WHERE (r.id_role IN ( SELECT DISTINCT cr.id_role_utilisateur
           FROM utilisateurs.cor_roles cr
          WHERE (cr.id_role_groupe IN ( SELECT crm.id_role
                   FROM utilisateurs.cor_role_menu crm
                  WHERE crm.id_menu = 5))
          ORDER BY cr.id_role_utilisateur)) OR (r.id_role IN ( SELECT crm.id_role
           FROM utilisateurs.cor_role_menu crm
             JOIN utilisateurs.t_roles r_1 ON r_1.id_role = crm.id_role AND crm.id_menu = 5 AND r_1.groupe = false AND r_1.active = true))
  ORDER BY (r.nom_role::text || ' '::text) || r.prenom_role::text, r.id_role;



