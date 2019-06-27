'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">geonature documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-006003a7bf951c3184921853fef64372"' : 'data-target="#xs-components-links-module-AdminModule-006003a7bf951c3184921853fef64372"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-006003a7bf951c3184921853fef64372"' :
                                            'id="xs-components-links-module-AdminModule-006003a7bf951c3184921853fef64372"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' : 'data-target="#xs-components-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' :
                                            'id="xs-components-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IntroductionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IntroductionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavItemsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavItemsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' : 'data-target="#xs-injectables-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' :
                                        'id="xs-injectables-links-module-AppModule-894345d472b7f911305cef9ba6c734e2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CruvedStoreService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CruvedStoreService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GlobalSubService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GlobalSubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModuleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModuleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SideNavService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SideNavService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExportsModule.html" data-type="entity-link">ExportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' : 'data-target="#xs-components-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' :
                                            'id="xs-components-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' }>
                                            <li class="link">
                                                <a href="components/ExportsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExportsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' : 'data-target="#xs-injectables-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' :
                                        'id="xs-injectables-links-module-ExportsModule-3f768ab8ecb52d98bdddf613418c085b"' }>
                                        <li class="link">
                                            <a href="injectables/ExportsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExportsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GN2CommonModule.html" data-type="entity-link">GN2CommonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' : 'data-target="#xs-components-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' :
                                            'id="xs-components-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                            <li class="link">
                                                <a href="components/AcquisitionFrameworksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AcquisitionFrameworksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreasIntersectedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreasIntersectedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatasetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatasetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DynamicFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GPSComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GPSComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenericFormGeneratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenericFormGeneratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeojsonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeojsonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeafletDrawComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeafletDrawComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeafletFileLayerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeafletFileLayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapListGenericFiltersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapListGenericFiltersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MarkerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDownloadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDownloadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MultiSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunicipalitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MunicipalitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NomenclatureComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NomenclatureComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObserversComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObserversComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObserversTextComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObserversTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeriodComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PeriodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxonomyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaxonomyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' : 'data-target="#xs-directives-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' :
                                        'id="xs-directives-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                        <li class="link">
                                            <a href="directives/DisableControlDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisableControlDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' : 'data-target="#xs-injectables-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' :
                                        'id="xs-injectables-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                        <li class="link">
                                            <a href="injectables/CommonService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CommonService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataFormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataFormService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DynamicFormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DynamicFormService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapListService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapListService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NgbDatePeriodParserFormatter.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NgbDatePeriodParserFormatter</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' : 'data-target="#xs-pipes-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' :
                                            'id="xs-pipes-links-module-GN2CommonModule-21f293bbd2f0927408cd38ffcda95bd2"' }>
                                            <li class="link">
                                                <a href="pipes/ReadablePropertiePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReadablePropertiePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetadataModule.html" data-type="entity-link">MetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MetadataModule-6ecb8db6a18c3f664a7f0ea1ea4dd3c4"' : 'data-target="#xs-components-links-module-MetadataModule-6ecb8db6a18c3f664a7f0ea1ea4dd3c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MetadataModule-6ecb8db6a18c3f664a7f0ea1ea4dd3c4"' :
                                            'id="xs-components-links-module-MetadataModule-6ecb8db6a18c3f664a7f0ea1ea4dd3c4"' }>
                                            <li class="link">
                                                <a href="components/ActorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AfFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AfFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AfListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AfListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatasetFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatasetFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatasetListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatasetListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SyntheseModule.html" data-type="entity-link">SyntheseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' : 'data-target="#xs-components-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' :
                                            'id="xs-components-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' }>
                                            <li class="link">
                                                <a href="components/ModalInfoObsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalInfoObsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyntheseCarteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SyntheseCarteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyntheseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SyntheseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyntheseListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SyntheseListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyntheseModalDownloadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SyntheseModalDownloadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SyntheseSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SyntheseSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxonAdvancedModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaxonAdvancedModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' : 'data-target="#xs-injectables-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' :
                                        'id="xs-injectables-links-module-SyntheseModule-e9d3b3a769e419299f413d590f3b727c"' }>
                                        <li class="link">
                                            <a href="injectables/DataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DynamicFormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DynamicFormService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyntheseFormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SyntheseFormService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyntheseStoreService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SyntheseStoreService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaxonAdvancedStoreService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TaxonAdvancedStoreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AcquisitionFrameworksComponent.html" data-type="entity-link">AcquisitionFrameworksComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AreasComponent.html" data-type="entity-link">AreasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GenericFormGeneratorComponent.html" data-type="entity-link">GenericFormGeneratorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalDownloadComponent.html" data-type="entity-link">ModalDownloadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MunicipalitiesComponent.html" data-type="entity-link">MunicipalitiesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ObserversTextComponent.html" data-type="entity-link">ObserversTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PeriodComponent.html" data-type="entity-link">PeriodComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/DropdownQuestion.html" data-type="entity-link">DropdownQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormBase.html" data-type="entity-link">FormBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetadataPaginator.html" data-type="entity-link">MetadataPaginator</a>
                            </li>
                            <li class="link">
                                <a href="classes/NomenclatureForm.html" data-type="entity-link">NomenclatureForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link">Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextboxQuestion.html" data-type="entity-link">TextboxQuestion</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DynamicFormService.html" data-type="entity-link">DynamicFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicFormService-1.html" data-type="entity-link">DynamicFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicFormService-2.html" data-type="entity-link">DynamicFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetadataFormService.html" data-type="entity-link">MetadataFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgbDateFRParserFormatter.html" data-type="entity-link">NgbDateFRParserFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgbDatePeriodParserFormatter.html" data-type="entity-link">NgbDatePeriodParserFormatter</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/MyCustomInterceptor.html" data-type="entity-link">MyCustomInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ModuleGuardService.html" data-type="entity-link">ModuleGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ColumnActions.html" data-type="entity-link">ColumnActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateStruc.html" data-type="entity-link">DateStruc</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Taxon.html" data-type="entity-link">Taxon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});