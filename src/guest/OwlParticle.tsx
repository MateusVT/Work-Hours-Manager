import React from 'react';
import Particles from 'react-particles-js';

export default function OwlParticle() {
    return <Particles
        style={{
            position: "absolute"
        }}
        params={{
            "fps_limit": 30,
            "particles": {
                "collisions": {
                    "enable": false
                },
                "number": {
                    "value": 200,
                    "density": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 25,
                    "opacity": 0.4
                },
                "move": {
                    "speed": 0.5
                },
                "opacity": {
                    "anim": {
                        "enable": true,
                        "opacity_min": 0.05,
                        "speed": 0.5,
                        "sync": true
                    },
                    "value": 0.4
                }
            },
            "polygon": {
                "enable": true,
                "scale": 0.4,
                "type": "inline" as any,
                "move": {
                    "radius": 10
                },
                "url": '/imgs/owl.svg',
                "inline": {
                    "arrangement": "equidistant"
                },
                "draw": {
                    "enable": true,
                    "stroke": {
                        "color": "rgba(255, 255, 255, .9)"
                    }
                }
            },
            "retina_detect": true,
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    }
                },
                "modes": {
                    "bubble": {
                        "size": 6,
                        "distance": 10
                    }
                }
            }
        }} />
}