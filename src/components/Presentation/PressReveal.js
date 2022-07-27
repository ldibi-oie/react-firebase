import React , {useEffect} from 'react'
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealMarkdown  from 'reveal.js/plugin/markdown/markdown.js';
import { useLocation } from "react-router-dom";

import "/node_modules/reveal.js/dist/reveal.css";
import "/node_modules/reveal.js/dist/theme/white.css";


export default function RevealPresentation() {
    const location = useLocation();
    const data = location.state.contentPage

    console.log(data)

    useEffect(() => {
        let deck = new Reveal({
            backgroundTransition: 'slide',
            transition: 'slide',
            plugins: [ Markdown , RevealMarkdown ]
         })

        deck.initialize({
            center: true,
            loop: true
        });

        deck.configure({ 
            autoSlide: 5000,
            loop: true
        });
    }, [])

    var stringToHTML = (str) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html').documentElement;
        console.log(doc);
        console.log(doc.body.querySelector("body").innerHTML);

        return  doc.body.querySelector("body").innerHTML
    };
    // stringToHTML(`<h1><strong style="color: rgb(152, 212, 220);">item</strong></h1>`)
    

  return (
    <>
        <div className="reveal" style={{ height: '100vh' }}>
            <div className="slides absolute" data-transition="slide">
                {
                    data.map((item) => (
                        <section>
                            {/* {stringToHTML(item.content)} */}
                            {item.content}
                        </section>
                    ))
                }
            </div>
		</div>
    </>
  )
}
