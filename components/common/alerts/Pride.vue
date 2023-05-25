<template>
    <div class="pride-month">
        <div class="pride-month__container">
            <div class="pride-month__container__gradient_bar"></div>
            <div class="pride-month__container__text">
                <h1>Happy Pride Month!</h1>
                <p>"I'm a proud member of the LGBTQIA+ community and I'm happy to celebrate Pride Month. I'm also happy to see that the tech industry is becoming more inclusive and diverse. I hope that one day, we can all truly be treated and accepted equally."</p>
            </div>
        </div>
    </div>
</template>

<style>
.pride-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    color: white;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff, #4b0082, #0000ff, #00ff00, #ffff00, #ff7f00, #ff0000);
    background-size: 1000% 1000%;
    animation: rainbow 40s infinite;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px 5px #000;
}
@keyframes rainbow {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
.pride-month__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #111111;
    margin: 10px;
    padding-bottom: 20px;
    padding-top: 10px;
}
.light .pride-month {
    box-shadow: none !important;
    margin-bottom: 20px;
}
.light .pride-month__container {
    background: #eee;
    color: #000;
}
.pride-month__container__gradient_bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20px;
    min-width: 20px;
    height: 100%;
    background: linear-gradient(90deg, #FF0000 0%, #FFA500 17.5%, #FFFF00 35%, #008000 52.5%, #0000FF 70%, #4B0082 87.5%, #EE82EE 100%);
    border-radius: 8px;
}

.pride-month__container__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
}

.pride-month__container__text h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.pride-month__container__text p {
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
}

.pride-month__container__text p a {
    color: #fff;
    text-decoration: underline;
}
</style>