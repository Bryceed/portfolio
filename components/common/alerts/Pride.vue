<template>
    <div class="pride-month">
    </div>
</template>

<style>
.pride-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 15px;
    overflow: hidden;
    color: white;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(to right, #FF0000 16.67%,
            #FF7F00 16.67% 33.34%,
            #FFFF00 33.34% 50.01%,
            #00FF00 50.01% 66.68%,
            #0000FF 66.68% 83.35%,
            #8B00FF 83.35% 100%);

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7);

    margin-bottom: 20px;
    position: fixed;
    left: 2px;
    top: 0;
    bottom: 0;
    z-index: 21;
}

.pride-month__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100% - 4rem);
    height: 100%;
    margin: 0 2rem;
    padding-top: 10px;
}

.light .pride-month {
    box-shadow: none !important;
}

.light .pride-month__container {}


.pride-month__container__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.pride-month__container__text h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;

    color: black;
}

.pride-month__container__text p {
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
}

.pride-month__container__text p a {
    color: #fff;
    text-decoration: underline;
}
</style>