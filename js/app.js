//==============================
// LIIC APRENDE
//==============================

// Navbar cambia al hacer scroll

const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.style.boxShadow = "0 15px 30px rgba(0,0,0,.10)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
}

//==============================
// MENÚ MÓVIL
//==============================

const btnMenu = document.getElementById("btnMenu");
const navMenu = document.getElementById("navMenu");

if (btnMenu && navMenu) {
    btnMenu.addEventListener("click", () => {
        btnMenu.classList.toggle("activo");
        navMenu.classList.toggle("activo");
    });

    // Cierra el menú al hacer clic en un enlace
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            btnMenu.classList.remove("activo");
            navMenu.classList.remove("activo");
        });
    });
}

//==============================
// Animación aparición
//==============================

const elementos = document.querySelectorAll(
    ".card,.areaCard,.materia,.recurso,.box,.numero,.dato,.ensayoCard"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
        }
    });
}, { threshold: .15 });

elementos.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition = ".8s";
    observer.observe(el);
});

//==============================
// Contadores
//==============================

const numeros = document.querySelectorAll(".numero h2,.dato h3");

function animarNumero(el) {
    const texto = el.innerText;
    const valor = parseInt(texto.replace(/\D/g, ""));
    let actual = 0;
    const incremento = Math.ceil(valor / 80);

    const intervalo = setInterval(() => {
        actual += incremento;

        if (actual >= valor) {
            actual = valor;
            clearInterval(intervalo);
        }

        if (texto.includes("+")) {
            el.innerHTML = "+" + actual;
        } else if (texto.includes("%")) {
            el.innerHTML = actual + "%";
        } else {
            el.innerHTML = actual;
        }
    }, 20);
}

const contadorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animarNumero(entry.target);
            contadorObserver.unobserve(entry.target);
        }
    });
});

numeros.forEach(n => contadorObserver.observe(n));

//==============================
// MODAL
//==============================

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

if (modal) {
    document.querySelectorAll(".bloqueada").forEach(card => {
        card.addEventListener("click", () => {
            const esEnsayo = card.classList.contains("ensayoCard");
            modalTitulo.innerHTML = "Próximamente";
            modalTexto.innerHTML = esEnsayo
                ? "Este ensayo se incorporará en próximas fases de <b>LIIC Aprende</b>."
                : "Este módulo estará disponible en futuras versiones de <b>LIIC Aprende</b>.";
            modal.classList.add("show");
        });
    });

    const cerrarModal = document.getElementById("cerrarModal");
    const btnCerrar = document.getElementById("btnCerrar");

    if (cerrarModal) cerrarModal.onclick = () => modal.classList.remove("show");
    if (btnCerrar) btnCerrar.onclick = () => modal.classList.remove("show");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("show");
    });
}

//==============================
// NAVEGACIÓN A MÓDULOS
//==============================

document.querySelectorAll(".btnEntrar[data-href]").forEach(btn => {
    btn.addEventListener("click", () => {
        window.location.href = btn.dataset.href;
    });
});

//==============================
// BOTONES DEL HERO
//==============================

const btnExplorar = document.getElementById("btnExplorar");
const btnConoceLiic = document.getElementById("btnConoceLiic");

if (btnExplorar) {
    btnExplorar.addEventListener("click", () => {
        document.getElementById("materias").scrollIntoView({ behavior: "smooth" });
    });
}

if (btnConoceLiic) {
    btnConoceLiic.addEventListener("click", () => {
        document.getElementById("liic").scrollIntoView({ behavior: "smooth" });
    });
}

//==============================
// BOTÓN SUBIR
//==============================

const topBtn = document.getElementById("btnTop");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 500 ? "block" : "none";
    });

    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

//==============================
// LOADER
//==============================

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.classList.add("loaderOculto");
    }, 1200);
});

//==============================
// PESTAÑAS DEL MÓDULO (modulo.html)
//==============================

document.querySelectorAll(".ensayoCard").forEach(card => {
    const botones = card.querySelectorAll(".tabBtn");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const destino = boton.dataset.tab;

            botones.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            card.querySelectorAll(".tabPanel").forEach(panel => {
                panel.classList.toggle("activo", panel.dataset.panel === destino);
            });
        });
    });
});

//==============================
// MODO OSCURO
//==============================

(function () {
    const CLAVE_TEMA = "liic-tema";
    const raiz = document.documentElement;

    function aplicarTema(tema) {
        raiz.setAttribute("data-theme", tema);
        localStorage.setItem(CLAVE_TEMA, tema);

        document.querySelectorAll(".btnTema").forEach(btn => {
            btn.textContent = tema === "dark" ? "☀️" : "🌙";
            btn.setAttribute(
                "aria-label",
                tema === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            );
        });
    }

    const temaGuardado = localStorage.getItem(CLAVE_TEMA) || "light";
    aplicarTema(temaGuardado);

    document.querySelectorAll(".btnTema").forEach(btn => {
        btn.addEventListener("click", () => {
            const actual = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
            aplicarTema(actual);
        });
    });
})();

//==============================
// BUSCADOR DE ENSAYOS (modulo.html)
//==============================

const buscadorEnsayos = document.getElementById("buscadorEnsayos");
const sinResultados = document.getElementById("sinResultados");

if (buscadorEnsayos) {
    buscadorEnsayos.addEventListener("input", () => {
        const termino = buscadorEnsayos.value.toLowerCase().trim();
        let visibles = 0;

        document.querySelectorAll(".ensayoCard").forEach(card => {
            // Los ensayos bloqueados no tienen <summary>: se busca en todo el texto de la tarjeta
            const encabezado = card.querySelector("summary") || card.querySelector(".ensayoBloqueadoHeader") || card;
            const texto = encabezado.textContent.toLowerCase();
            const coincide = texto.includes(termino);
            card.style.display = coincide ? "" : "none";
            if (coincide) visibles++;
        });

        if (sinResultados) {
            sinResultados.classList.toggle("mostrar", visibles === 0);
        }
    });
}

//==============================
// PROGRESO DEL ESTUDIANTE (localStorage)
//==============================

const CLAVE_PROGRESO = "liic-progreso-pavimentos";

function obtenerProgreso() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || {};
    } catch (e) {
        return {};
    }
}

function guardarProgreso(datos) {
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(datos));
}

function actualizarBarraProgreso() {
    const tarjetas = document.querySelectorAll(".ensayoCard[data-id]");
    const barra = document.getElementById("barraProgreso");
    const texto = document.getElementById("progresoTexto");

    if (!tarjetas.length || !barra) return;

    const progreso = obtenerProgreso();
    let completados = 0;

    tarjetas.forEach(card => {
        if (progreso[card.dataset.id]) completados++;
    });

    const porcentaje = Math.round((completados / tarjetas.length) * 100);
    barra.style.width = porcentaje + "%";

    if (texto) {
        texto.textContent = `${completados} de ${tarjetas.length} ensayos completados (${porcentaje}%)`;
    }
}

document.querySelectorAll(".checkCompletado").forEach(check => {
    const card = check.closest(".ensayoCard");
    if (!card || !card.dataset.id) return;

    const progreso = obtenerProgreso();
    check.checked = !!progreso[card.dataset.id];

    check.addEventListener("change", () => {
        const datos = obtenerProgreso();
        datos[card.dataset.id] = check.checked;
        guardarProgreso(datos);
        actualizarBarraProgreso();
    });
});

actualizarBarraProgreso();

//==============================
// IMPRIMIR / EXPORTAR FICHA A PDF
//==============================

document.querySelectorAll(".btnImprimir").forEach(boton => {
    boton.addEventListener("click", () => {
        const card = boton.closest(".ensayoCard");
        if (!card) return;

        card.setAttribute("open", "");
        card.classList.add("solo-imprimir");
        document.body.classList.add("modo-impresion");

        window.print();
    });
});

window.addEventListener("afterprint", () => {
    document.body.classList.remove("modo-impresion");
    document.querySelectorAll(".solo-imprimir").forEach(card => {
        card.classList.remove("solo-imprimir");
    });
});

//==============================
// ANIMACIÓN AL ABRIR UNA FICHA
//==============================

document.querySelectorAll(".ensayoCard").forEach(card => {
    card.addEventListener("toggle", () => {
        if (card.open) {
            const cuerpo = card.querySelector(".ensayoCuerpo");
            if (!cuerpo) return;
            cuerpo.style.animation = "none";
            requestAnimationFrame(() => {
                cuerpo.style.animation = "subir .4s ease";
            });
        }
    });
});

//==============================
// AUTOEVALUACIÓN INTERACTIVA (modulo.html)
//==============================

const PREGUNTAS = {
    "marshall-elaboracion": [
        {
            p: "¿Cuántas probetas se elaboran por cada contenido de asfalto?",
            o: ["2", "3", "6", "18"],
            r: 1,
            e: "Se elaboran 3 probetas por cada contenido de asfalto. Con 6 contenidos, el total mínimo es de 18 probetas."
        },
        {
            p: "¿Cuánto puede superar la temperatura de los agregados a la del asfalto al momento de mezclar?",
            o: ["No puede superarla", "Máximo 28 °C", "Máximo 50 °C", "No hay límite"],
            r: 1,
            e: "Los agregados se calientan por encima de la temperatura del asfalto, pero sin superarla en más de 28 °C, para no envejecer el ligante."
        },
        {
            p: "La mezcla se enfrió por debajo de la temperatura de compactación antes de llevarla al molde. ¿Qué se debe hacer?",
            o: ["Recalentarla en el horno", "Compactarla con más golpes", "Descartarla", "Compactarla igual"],
            r: 2,
            e: "No se permite recalentar la mezcla porque cambian las propiedades del asfalto. La mezcla debe descartarse."
        },
        {
            p: "¿Cómo se acomoda la mezcla con la espátula antes de compactar?",
            o: ["10 golpes en el perímetro y 15 en el centro", "15 golpes en el perímetro y 10 en el interior", "25 golpes distribuidos al azar", "No se usa espátula"],
            r: 1,
            e: "Se dan 15 golpes alrededor del perímetro y 10 en el interior, y luego se nivela la superficie."
        },
        {
            p: "Una probeta de 1200 g quedó con 66 mm de altura. ¿Qué masa deberías usar en las siguientes probetas?",
            o: ["1200 g", "≈ 1155 g", "≈ 1247 g", "≈ 1100 g"],
            r: 1,
            e: "Masa ajustada = 63,5 × 1200 ÷ 66 ≈ 1155 g. Como la probeta salió más alta de lo esperado, se necesita menos masa."
        }
    ],
    "gravedad-especifica-maxima": [
        {
            p: "¿Qué presión residual debe marcar el manómetro durante la remoción del aire?",
            o: ["27 psi", "27,5 ± 2,5 mm Hg", "760 mm Hg", "No importa el valor"],
            r: 1,
            e: "La presión residual debe ser de 3,7 ± 0,3 kPa, equivalentes a 27,5 ± 2,5 mm Hg. Se trata de vacío, no de presión positiva."
        },
        {
            p: "¿Durante cuánto tiempo se mantienen el vacío y la agitación?",
            o: ["2 minutos", "5 minutos", "15 ± 2 minutos", "1 hora"],
            r: 2,
            e: "El vacío se alcanza en máximo 2 minutos y luego se mantiene, junto con la agitación, durante 15 ± 2 minutos."
        },
        {
            p: "Si la muestra se ensaya con grumos sin separar, ¿qué le pasa a la Gmm obtenida?",
            o: ["Resulta mayor", "Resulta menor", "No cambia", "El ensayo no se puede hacer"],
            r: 1,
            e: "Dentro de los grumos queda aire atrapado que aumenta el volumen aparente de la muestra, por lo que la Gmm resulta menor que la real."
        },
        {
            p: "¿Por qué se libera el vacío lentamente con la válvula de purga?",
            o: ["Para enfriar la muestra", "Para no arrastrar partículas finas", "Para acelerar el ensayo", "Para calibrar el manómetro"],
            r: 1,
            e: "Un cambio brusco de presión puede arrastrar partículas finas fuera del picnómetro y alterar la masa de la muestra."
        },
        {
            p: "Con A = 1500 g, B = 1250 g y C = 2130 g, ¿cuánto vale la Gmm?",
            o: ["2,419", "1,205", "2,650", "0,413"],
            r: 0,
            e: "Gmm = A ÷ (A + B − C) = 1500 ÷ (1500 + 1250 − 2130) = 1500 ÷ 620 ≈ 2,419."
        }
    ]
};

document.querySelectorAll(".autoevalBox[data-quiz]").forEach(caja => {
    const preguntas = PREGUNTAS[caja.dataset.quiz];
    if (!preguntas) return;

    const nombre = caja.dataset.quiz;

    const html = preguntas.map((q, i) => `
        <fieldset class="quizPregunta" data-indice="${i}">
            <legend>${i + 1}. ${q.p}</legend>
            ${q.o.map((op, j) => `
                <label class="quizOpcion">
                    <input type="radio" name="${nombre}-${i}" value="${j}">
                    <span>${op}</span>
                </label>
            `).join("")}
            <div class="quizExplicacion"></div>
        </fieldset>
    `).join("");

    caja.innerHTML = `
        <p class="quizIntro">Responde las ${preguntas.length} preguntas y luego pulsa <b>Calificar</b>.</p>
        <form class="quizForm">${html}
            <div class="quizAcciones">
                <button type="submit">Calificar</button>
                <button type="button" class="quizReiniciar">Reintentar</button>
            </div>
            <div class="quizResultado" aria-live="polite"></div>
        </form>
    `;

    const form = caja.querySelector(".quizForm");
    const resultado = caja.querySelector(".quizResultado");

    form.addEventListener("submit", e => {
        e.preventDefault();
        let correctas = 0;

        preguntas.forEach((q, i) => {
            const bloque = form.querySelector(`[data-indice="${i}"]`);
            const marcada = form.querySelector(`input[name="${nombre}-${i}"]:checked`);
            const explicacion = bloque.querySelector(".quizExplicacion");

            bloque.classList.remove("correcta", "incorrecta");
            bloque.querySelectorAll(".quizOpcion").forEach(l => l.classList.remove("esCorrecta"));
            bloque.querySelectorAll(".quizOpcion")[q.r].classList.add("esCorrecta");

            if (marcada && Number(marcada.value) === q.r) {
                correctas++;
                bloque.classList.add("correcta");
                explicacion.innerHTML = "✅ " + q.e;
            } else {
                bloque.classList.add("incorrecta");
                explicacion.innerHTML = (marcada ? "❌ " : "⚪ Sin responder. ") + q.e;
            }
        });

        const porcentaje = Math.round((correctas / preguntas.length) * 100);
        resultado.innerHTML = `Obtuviste <b>${correctas} de ${preguntas.length}</b> (${porcentaje} %). ` +
            (porcentaje >= 80
                ? "¡Muy bien! Estás preparado para la práctica."
                : "Repasa la guía paso a paso y los errores frecuentes antes de ir al laboratorio.");
        resultado.className = "quizResultado mostrar " + (porcentaje >= 80 ? "aprobado" : "repasar");
    });

    caja.querySelector(".quizReiniciar").addEventListener("click", () => {
        form.reset();
        form.querySelectorAll(".quizPregunta").forEach(b => b.classList.remove("correcta", "incorrecta"));
        form.querySelectorAll(".quizOpcion").forEach(l => l.classList.remove("esCorrecta"));
        form.querySelectorAll(".quizExplicacion").forEach(x => x.innerHTML = "");
        resultado.className = "quizResultado";
        resultado.innerHTML = "";
    });
});

//==============================
// VIDEO POR ENSAYO: FRAGMENTO, CAPÍTULOS Y PANTALLA FINAL (v6)
// Usa la API oficial de Vimeo (player.js). Si no carga,
// los capítulos siguen funcionando recargando el video.
//==============================

function formatoTiempo(seg) {
    seg = Math.max(0, Math.floor(seg));
    const m = Math.floor(seg / 60);
    const s = String(seg % 60).padStart(2, "0");
    return `${m}:${s}`;
}

document.querySelectorAll(".videoVimeo").forEach(iframe => {
    const panel = iframe.closest(".tabPanel");
    const card = iframe.closest(".ensayoCard");
    const caja = panel.querySelector(".capitulos");
    const fin = panel.querySelector(".videoFin");
    const progreso = panel.querySelector(".videoProgreso");
    const id = iframe.dataset.video;
    const h = iframe.dataset.h;

    const INICIO = Number(iframe.dataset.inicio);
    const FIN = Number(iframe.dataset.fin);

    // Segmento activo: { inicio, fin, siguiente, siguienteTxt } o null (práctica completa)
    let segmento = { inicio: INICIO, fin: FIN, siguiente: null, siguienteTxt: "" };
    let anterior = 0;
    let duracionTotal = 2229;

    const usaApi = typeof Vimeo !== "undefined" && Vimeo.Player;
    const player = usaApi ? new Vimeo.Player(iframe) : null;

    function marcarBoton(boton) {
        if (!caja) return;
        caja.querySelectorAll(".capBtn").forEach(b => b.classList.remove("activo"));
        if (boton) boton.classList.add("activo");
    }

    function ocultarFin() {
        if (fin) fin.hidden = true;
    }

    function mostrarFin() {
        if (!fin) return;
        const titulo = fin.querySelector(".videoFinTitulo");
        const sig = fin.querySelector(".vfSiguiente");
        if (segmento && segmento.siguiente) {
            titulo.textContent = "✔ Terminaste esta parte del ensayo";
            sig.textContent = "▶ Continuar: " + segmento.siguienteTxt;
            sig.hidden = false;
        } else {
            titulo.textContent = "✔ Terminaste el video de este ensayo";
            sig.hidden = true;
        }
        fin.hidden = false;
    }

    function pintarProgreso(t) {
        if (!progreso) return;
        const modo = progreso.querySelector(".vpModo");
        const tiempo = progreso.querySelector(".vpTiempo");
        const relleno = progreso.querySelector(".vpRelleno");
        const volver = progreso.querySelector(".vpVolver");

        if (segmento) {
            const largo = segmento.fin - segmento.inicio;
            const dentro = Math.min(Math.max(t - segmento.inicio, 0), largo);
            modo.textContent = segmento.siguiente ? "Preparación de la muestra" : "Fragmento de este ensayo";
            tiempo.textContent = `${formatoTiempo(dentro)} / ${formatoTiempo(largo)}`;
            relleno.style.width = (dentro / largo * 100) + "%";
            volver.hidden = true;
        } else {
            modo.textContent = "Práctica completa";
            tiempo.textContent = `${formatoTiempo(t)} / ${formatoTiempo(duracionTotal)}`;
            relleno.style.width = (t / duracionTotal * 100) + "%";
            volver.hidden = false;
        }
    }

    function irA(t, nuevoSegmento) {
        segmento = nuevoSegmento;
        anterior = t;
        ocultarFin();
        pintarProgreso(t);

        if (player) {
            player.setCurrentTime(t)
                .then(() => player.play())
                .catch(() => {});
        } else {
            iframe.src = `https://player.vimeo.com/video/${id}?h=${h}&title=0&byline=0&portrait=0&autoplay=1#t=${t}s`;
        }
        iframe.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Botones de capítulos
    if (caja) {
        caja.querySelectorAll(".capBtn").forEach(boton => {
            boton.addEventListener("click", () => {
                const t = Number(boton.dataset.t);
                const nuevo = boton.dataset.fin
                    ? {
                        inicio: t,
                        fin: Number(boton.dataset.fin),
                        siguiente: boton.dataset.siguiente ? Number(boton.dataset.siguiente) : null,
                        siguienteTxt: boton.dataset.siguienteTxt || ""
                    }
                    : null; // capítulos de otros ensayos = práctica completa
                // Si el capítulo propio está dentro del fragmento principal, se respeta el inicio del fragmento para la barra
                if (nuevo && !nuevo.siguiente && nuevo.fin === FIN) nuevo.inicio = Math.min(INICIO, t);
                marcarBoton(boton);
                irA(t, nuevo);
            });
        });
    }

    // Botones de la pantalla final
    if (fin) {
        fin.querySelector(".vfRepetir").addEventListener("click", () => {
            irA(segmento ? segmento.inicio : INICIO, segmento || { inicio: INICIO, fin: FIN, siguiente: null, siguienteTxt: "" });
        });

        fin.querySelector(".vfSiguiente").addEventListener("click", () => {
            const t = segmento.siguiente;
            const boton = caja ? caja.querySelector(`.capPropio[data-t="${t}"]`) : null;
            marcarBoton(boton);
            irA(t, { inicio: t, fin: FIN, siguiente: null, siguienteTxt: "" });
        });

        fin.querySelector(".vfQuiz").addEventListener("click", () => {
            if (player) player.pause().catch(() => {});
            const tab = card ? card.querySelector('.tabBtn[data-tab="autoeval"]') : null;
            if (tab) {
                tab.click();
                tab.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        fin.querySelector(".vfCompleta").addEventListener("click", () => {
            segmento = null;
            ocultarFin();
            marcarBoton(null);
            if (player) player.play().catch(() => {});
        });
    }

    // Volver al fragmento desde el modo práctica completa
    if (progreso) {
        progreso.querySelector(".vpVolver").addEventListener("click", () => {
            const boton = caja ? caja.querySelector(`.capPropio[data-t="${INICIO}"]`) : null;
            marcarBoton(boton);
            irA(INICIO, { inicio: INICIO, fin: FIN, siguiente: null, siguienteTxt: "" });
        });
    }

    pintarProgreso(INICIO);

    // Sin API: no se puede detener el video; se oculta la barra de avance
    if (!player) {
        if (progreso) progreso.hidden = true;
        return;
    }

    player.getDuration().then(d => { duracionTotal = d; }).catch(() => {});

    player.on("timeupdate", datos => {
        const t = datos.seconds;
        pintarProgreso(t);

        // Detener solo cuando el video CRUZA el final del fragmento reproduciendo
        // (si el estudiante adelanta a mano más allá, no se interrumpe)
        if (segmento && anterior < segmento.fin && t >= segmento.fin && t - anterior < 3) {
            player.pause().catch(() => {});
            mostrarFin();
        } else if (segmento && t > segmento.fin + 2 && fin && fin.hidden) {
            // El estudiante siguió reproduciendo o adelantó: pasa a práctica completa
            segmento = null;
            marcarBoton(null);
            pintarProgreso(t);
        }
        anterior = t;
    });

    player.on("play", () => {
        ocultarFin();
    });

    player.on("seeked", datos => {
        anterior = datos.seconds;
        pintarProgreso(datos.seconds);
    });
});
