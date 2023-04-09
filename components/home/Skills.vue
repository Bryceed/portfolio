<template>
    <div class="skills">
        <h2>Skills</h2>
        <div class="skills__container">
            <div class="skills__container__item">
                <div class="skills__container__item__icon">
                    <i class="material-icons">code</i>
                </div>
                
                <h4>HTML5</h4>
                <div class="meter">
                    <CommonMeter :value="5" />
                </div>

                <h4>CSS3</h4>
                <div class="meter">
                    <CommonMeter :value="4" />
                </div>
            </div>
        </div>
    </div>      
</template>

<script>
export default {
    name: 'Skills',
}
</script>

<style scoped>
.skills {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.skills h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

.skills__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.skills__container__item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0;
}

.skills__container__item__icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #fff;
    margin-bottom: 20px;
}

.meter {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>