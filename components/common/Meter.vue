<template>
    <div class="meter">
        <div class="meter__container">
            <div v-for="i in 5" :key="i" :class="['meter__container__bar', value >= i ? 'active' : '']">
                <div class="meter__container__bar__value"></div>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonMeter',
    props: {
        value: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.meter {
    width: 100%;
    height: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.meter__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.meter__container__bar {
    width: 20%;
    height: 100%;
    background-color: #111;
    margin: 0 2px;
    border-radius: 11px;
    position: relative;
    overflow: hidden;
}
html.light .meter__container__bar:not(.active)  {
    background-color: #ffffff;
}

/* make lower bars shorter in height */
.meter__container__bar:nth-child(5) {
    height: 100%;
}

.meter__container__bar:nth-child(4) {
    height: 90%;
}

.meter__container__bar:nth-child(3) {
    height: 80%;
}

.meter__container__bar:nth-child(2) {
    height: 70%;
}

.meter__container__bar:nth-child(1) {
    height: 60%;
}

.meter__container__bar.active:nth-child(4) .meter__container__bar__value {
    background-color: rgba(255, 255, 255, .2);
}
.meter__container__bar.active:nth-child(3) .meter__container__bar__value {
    background-color: rgba(255, 255, 255, .4);
}
.meter__container__bar.active:nth-child(2) .meter__container__bar__value {
    background-color: rgba(255, 255, 255, .6);
}
.meter__container__bar.active:nth-child(1) .meter__container__bar__value {
    background-color: rgba(255, 255, 255, .8);
}

.meter__container__bar.active .meter__container__bar__value {
    height: 100%;
}
e
.meter__container__bar__value {
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: ease-out .25s;
}

.meter__container__bar.active {
    background-color: rgb(96, 8, 218);
}

</style>