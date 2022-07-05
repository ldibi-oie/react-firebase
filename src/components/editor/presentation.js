import React from 'react'
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
   plugins: [ Markdown ]
})
deck.initialize();

export default function presentation() {
  return (
    <div>presentation</div>
  )
}
