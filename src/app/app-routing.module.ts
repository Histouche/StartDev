import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'edit-profil', loadChildren: './pages/profil-pages/edit-profil/edit-profil.module#EditProfilPageModule' },
  { path: 'relations', loadChildren: './pages/profil-pages/relations/relations.module#RelationsPageModule' },
  { path: 'recherche', loadChildren: './pages/recherche/recherche.module#RecherchePageModule' },
  { path: 'offre-detail', loadChildren: './pages/offre-detail/offre-detail.module#OffreDetailPageModule' },
  { path: 'connexion', loadChildren: './pages/connexion/connexion.module#ConnexionPageModule' },
  { path: 'profil', loadChildren: './pages/profil/profil.module#ProfilPageModule' },
  { path: 'messagerie', loadChildren: './pages/messagerie/messagerie.module#MessageriePageModule' },
  { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  { path: 'cv-edit', loadChildren: './pages/profil-pages/cv-edit/cv-edit.module#CvEditPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
