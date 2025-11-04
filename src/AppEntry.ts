import { registerRootComponent } from 'expo';
import App from './App';
import { createTables } from './utils/firebase';

createTables();
registerRootComponent(App);
