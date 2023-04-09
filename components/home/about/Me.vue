<template>
    <div class="about">
        <div class="about__container">
            <div class="about__container__image">
                <img src="https://avatars.githubusercontent.com/u/42657376?v=4" alt="Wellington">
            </div>
            <div class="about__container__text">
                <h1>Hi, I'm <span>Wellington</span></h1>
                <p>I'm a <span>Full-stack Developer</span> from Brazil.</p>
                <p>I'm passionate about <span>Web Development</span> and <span>UI/UX Design</span>.</p>
                <p>I'm currently working at <span><a :href="company.url" target="_blank">{{ company.name }}</a></span>.</p>
                <p>Feel free to <span><a href="https://github.com/Bryceed" target="_blank">contact me</a></span> for any purpose!</p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeAboutMe',
    data() {
        return {
            company: {
                name: 'ESX',
                url: 'https://esx.com.br/'
            }
        }
    }
}
</script>

<style>
.about {
    width: 100%;
    height: calc(100vh - 115px); 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(30, 30, 30, 0.197);
    border-radius: 5px;
}

.about__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
}

.about__container__text {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

.about__container__text h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

.about__container__text h1 span {
    color: #7d28fd;
}

.about__container__text p {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 20px;
}

.about__container__text p span {
    color: #ac65fc;
}

.about__container__image {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0 !important;
}

.about__container__image img {
    width: 70%;
    max-width: 500px;
    border-radius: 50%;
    border: 5px solid #0A1B28;
    filter: drop-shadow(0 0 10px #f3f3f3) contrast(1.5) brightness(1);
    z-index: 0 !important;
    position: relative;
}

@media (max-width: 768px) {
    .about__container {
        flex-direction: column;
    }

    .about__container__text {
        margin-bottom: 20px;
    }
}
</style>