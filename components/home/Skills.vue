<template>
    <div class="skills">
        <h2>Skills</h2>
        <div class="skills__container">
            <div class="skills__container__item">
                <div class="skills__container__item__icon">
                    <i class="material-icons">code</i>
                </div>
            </div>

            <div class="skills__container__table">
                <div class="skills__container__table__column">
                    <h2>Front-end</h2>
                    <div class="_item">
                        <div class="_item__name">HTML</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">CSS</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">SASS</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Bootstrap</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Tailwind</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Bulma</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Vuetify</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Materialize</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">jQuery</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Angular</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">JavaScript</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">TypeScript</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Vue</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Nuxt3</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">React</div>
                        <CommonMeter :value="3" />
                    </div>
                </div>
                <div class="skills__container__table__column">
                    <h2>Back-end</h2>
                    <div class="_item">
                        <div class="_item__name">Node.js</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Express.js</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">MongoDB</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">MySQL</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Firebase Firestore</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">PHP</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Laravel</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Python</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Java</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Java Spring</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">C#</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">ASP.NET MVC</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Blazor</div>
                        <CommonMeter :value="3" />
                    </div>
                </div>
                <div class="skills__container__table__column">
                    <h2>Infra</h2>
                    <div class="_item">
                        <div class="_item__name">Apache</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Nginx</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Apache Tomcat</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Docker</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Kubernetes</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">AWS</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Oracle Cloud</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Google Cloud</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Firebase</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Heroku</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Netlify</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Vercel</div>
                        <CommonMeter :value="5" />
                    </div> 
                    <div class="_item">
                        <div class="_item__name">GitHub</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">GitLab</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Bitbucket</div>
                        <CommonMeter :value="3" />
                    </div>
                </div>
                <div class="skills__container__table__column">
                    <h2>DevOps</h2>
                    <div class="_item">
                        <div class="_item__name">Jenkins</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">CircleCI</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">TravisCI</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">GitHub Actions</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">GitLab CI/CD</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Bitbucket Pipelines</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">AWS CodePipeline</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">AWS CodeBuild</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">AWS CodeDeploy</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Oracle Cloud DevOps</div>
                        <CommonMeter :value="5" />
                    </div>
                </div>
                <div class="skills__container__table__column">
                    <h2>Productivity</h2>
                    <div class="_item">
                        <div class="_item__name">Microsoft Office</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Word</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Excel</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">PowerPoint</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Access</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Notion</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Trello</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Jira</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Slack</div>
                        <CommonMeter :value="5" />
                    </div>
                </div>
                <div class="skills__container__table__column">
                    <h2>Design</h2>
                    <div class="_item">
                        <div class="_item__name">Adobe Photoshop</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Adobe Illustrator</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Adobe XD</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Adobe InDesign</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Adobe After Effects</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Adobe Premiere Pro</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Figma</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Canva</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Pixlr X</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Inkscape</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Gimp</div>
                        <CommonMeter :value="2" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Blender</div>
                        <CommonMeter :value="2" />
                    </div>
                </div> 
                <div class="skills__container__table__column">
                    <h2>Others</h2>
                    <div class="_item">
                        <div class="_item__name">Windows</div>
                        <CommonMeter :value="5" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Linux</div>
                        <CommonMeter :value="4" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">MacOS</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Android</div>
                        <CommonMeter :value="3" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">iOS</div>
                        <CommonMeter :value="1" />
                    </div>
                    <div class="_item">
                        <div class="_item__name">Git</div>
                        <CommonMeter :value="4" />
                    </div>
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
    margin: 48px 0;
}

.skills h2 {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}
html.light h2 {
    color: #000;
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

.skills__container__table {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
}

.skills__container__table__column {
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px 12px;
}

.skills__container__table__column h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 5px;
}
html.light .skills__container__table__column h2 {
    color: #000;
}

._item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin: 10px 0;

    padding: 0px 7px 5px;
    background-color: rgba(255,255,255,.03);
    border-radius: 5px;
}

._item__name {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
}
html.light ._item__name {
    color: #777;
}

._item__meter {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

._item__meter__bar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}




.meter {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>