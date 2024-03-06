import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-62e0c","appId":"1:977494892218:web:45f667f6e4a89a06a4ac83","storageBucket":"ring-of-fire-62e0c.appspot.com","apiKey":"AIzaSyCwCzAvvfHPI77A2_9kof840xsVw3XUIyc","authDomain":"ring-of-fire-62e0c.firebaseapp.com","messagingSenderId":"977494892218","measurementId":"G-B601HZ9QXC"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-62e0c","appId":"1:977494892218:web:45f667f6e4a89a06a4ac83","storageBucket":"ring-of-fire-62e0c.appspot.com","apiKey":"AIzaSyCwCzAvvfHPI77A2_9kof840xsVw3XUIyc","authDomain":"ring-of-fire-62e0c.firebaseapp.com","messagingSenderId":"977494892218","measurementId":"G-B601HZ9QXC"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
