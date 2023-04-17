<template>
    <div class="carousel">
        <div class="inner">
            <div class="card" v-for="card in cards" :key="card">
                {{ card }}
            </div>
        </div>
    </div>
    <button @click="prev">prev</button>
    <button @click="next">next</button>
</template>
  
<script>
export default {
    data() {
        return {
            cards: [1, 2, 3, 4, 5, 6, 7, 8],
            innerStyles: {},
            step: '',
            transitioning: false
        }
    },

    mounted() {
        this.setStep()
        this.resetTranslate()
    },

    methods: {
        setStep() {
            const innerWidth = this.$refs.inner.scrollWidth
            const totalCards = this.cards.length
            this.step = `${innerWidth / totalCards}px`
        },

        next() {
            if (this.transitioning) return
            this.transitioning = true

            this.moveLeft()
            this.afterTransition(() => {
                const card = this.cards.shift()
                this.cards.push(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        afterTransition(callback) {
            const listener = () => {
                callback()
                this.$refs.inner.removeEventListener('transitionend', listener)
            }
            this.$refs.inner.addEventListener('transitionend', listener)
        },

        resetTranslate() {
            this.innerStyles = {
                //transition: 'none', // ❷
                transform: 'translateX(0)'
            }
        },

        moveLeft() {
            this.innerStyles = {
                transform: `translateX(-${this.step})
                translateX(-${this.step})` // ❶
            }
        },
        moveRight() {
            this.innerStyles = {
                transform: `translateX(${this.step})
                translateX(-${this.step})` // ❷
            }
        }
    }
}
</script>

<style>
.carousel {
    width: 170px;
    overflow: hidden;
}

.inner {
    white-space: nowrap;
    transition: transform 1s;
}

.card {
    width: 40px;
    margin-right: 10px;
    display: inline-flex;

    height: 40px;
    background-color: #39b1bd;
    color: white;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
}

button {
    margin-right: 5px;
    margin-top: 10px;
}
</style>