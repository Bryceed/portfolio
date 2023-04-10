<template>
    <nav>
        <div class="logo">
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>l</span>
            <div class="typing">
                <span>.</span>
                <span>d</span>
                <span>e</span>
                <span>v</span>
            </div>
            <div class="code-selector active"></div>
        </div>
        <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li>Projects <div class="expand-icon">▾</div>
                <div class="collapse-icon">▴</div>
                <ul>
                    <li><nuxt-link to="/projects/1">Project 1</nuxt-link></li>
                    <li><nuxt-link to="/projects/2">Project 2</nuxt-link></li>
                    <li><nuxt-link to="/projects/3">Project 3</nuxt-link></li>
                </ul>
            </li>
            <ThemeSwitcher />
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Menu',

    mounted() {
        const logo = document.querySelector('.logo')
        const codeSelector = document.querySelector('.code-selector')
        let spans = document.querySelectorAll('.logo span')
        const typing = () => {
            spans.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active')
                }, 100 * (idx + 1))
            })

            setTimeout(() => {
                codeSelector.classList.add('active')
            }, 1000)

            // then remove the active class from codeSelector
            setTimeout(() => {
                codeSelector.classList.remove('active')
            }, 1500)
        }
        typing()

        //default text: Well.dev
        const newSuffixTexts = [
            '.dev',
            '.design',
            '.ux',
            '.ui',
            '.php',
            '.js',
            '.html',
            '.css',
            '.react',
            '.C#',
            '.python',
            '.java',
            '.lua',
            '.sql',
            '.json',
            '.xml',
            '.git',
            '.github',
            '.flutter',
            '.mysql',
            '.mongodb',
            '.node',
            '.discord-api',
            '.gostoso',
            '.vue',
            '.nuxt',
            '.esx',
            'ington N.',
        ]

        //change suffix every 10 seconds
        // newSuffixTexts quantity = 16
        let index = 0;
        let indexDelay = 0;
        let waitingTime = 0;

        let oldSuffix;
        let newSuffix;

        let toEdit = document.querySelector('.typing');
        let editSpans;

        setInterval(() => {
            toEdit = document.querySelector('.typing');
            editSpans = document.querySelectorAll('.typing span');
            index++;
            oldSuffix = newSuffixTexts[index - 1];
            newSuffix = newSuffixTexts[index];
            
            if (index > newSuffixTexts.length - 1) {
                clearInterval();
            }
            waitingTime = 0;
            
            console.log(oldSuffix.length, newSuffix.length)

            // remove from end to start, same quantity of the new text
            codeSelector.classList.add('active')

            for (let i = oldSuffix.length - 1; i >= 0; i--) {
                indexDelay += 200;
                setTimeout(() => {
                    editSpans[oldSuffix.length - 1 - i].classList.add('remove')
                    setTimeout(() => {
                        editSpans[oldSuffix.length - 1 - i].remove()
                    }, 200)
                }, 170 * (i + 1))
            }

            indexDelay = 0;

            setTimeout(() => {
                codeSelector.classList.add('active')
                waitingTime = 0;
                for (let i = 0; i < newSuffix.length; i++) {
                    let _span = document.createElement('span');
                    _span.innerText = newSuffix[i];
                    _span.classList.add('active')
                    setTimeout(() => {
                        toEdit.appendChild(_span)
                    }, 60 * (i + 1))
                    setTimeout(() => {
                        waitingTime += 60;
                    }, 60 * (i + 1))
                }

                setTimeout(() => {
                    codeSelector.classList.remove('active')
                }, waitingTime)
            }, 1500 + waitingTime)
            
        }, 4000 + waitingTime)
    }
}
</script>

<style>
nav {
    background-color: rgba(51, 51, 51, .7);
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    border-radius: 5px;
    position: sticky;
    top: 0;
    z-index: 9;
    backdrop-filter: blur(10px);
}

nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

nav ul li {
    display: inline-block;
    margin-right: 10px;
    position: relative;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

nav ul li a:hover {
    color: #ccc;
}

nav .logo {
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    margin: 0 10px;
    display: flex;
    align-items: center;
    height: 1.5em;
}

nav .logo .code-selector {
    height: 1.1em;
    width: .65em;
    background-color: #fff;
    display: inline-block;
    animation: blink 1s infinite;
    animation-delay: 1s;
    transition: ease-out 1s;
}

nav .logo .code-selector.active {
    animation: none;
}

nav .logo span {
    display: none;
    width: 0;
}

nav .logo span.active {
    display: inline-block;
    animation: typing .1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    transition: ease-out 1s;
}

@keyframes typing {
    0% {
        width: 0;
    }

    100% {
        width: 0.7em;
    }
}

@keyframes blink {
    0% {
        height: 1em;
    }

    40%,
    50% {
        height: 0em;
    }

    100% {
        height: 1em;
    }
}

/* dropdown menu */
nav ul li ul {
    display: none;
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 10px;
    margin: 0;
    top: 100%;
    width: 160px;
    right: 0;
}

nav ul li:hover ul {
    display: block;
}

nav ul li ul li {
    display: block;
    margin: 0;
}

/* dropdown menu icons */
nav ul li .expand-icon,
nav ul li:hover .collapse-icon {
    display: inline-block;
}

nav ul li:hover .expand-icon,
nav ul li .collapse-icon {
    display: none;
}</style>