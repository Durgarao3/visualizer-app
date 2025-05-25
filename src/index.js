import 'bpk-stylesheets/base';
import 'bpk-stylesheets/base.css';
import 'bpk-stylesheets/font';
import 'bpk-stylesheets/font.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
