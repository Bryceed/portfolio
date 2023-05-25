<template>
    <span>OK</span>
    <a class="btn" :href="link" :target="target">
        {{ title }}
    </a>
</template>

<script>

export default {
    name: 'Button',
    props: {
        title: {
            type: String,
            required: true,
            default: 'Link',
        },
        link: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: false,
            default: '_blank',
        },

    },
};
</script>

<style scoped>
.btn {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 700;
    padding: .4rem .75rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: rgba(95, 13, 228, 0.791);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    transition: all .15s ease-out;
}

.btn:hover {
    background-color: rgba(142, 72, 255, 0.787);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(255,255,255,1);
    transform: translateY(-2px);
    transition: all .2s ease-out;
}
.btn:active {
    background-color: rgb(96, 0, 250);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1), 0 0 0 6px rgba(255,255,255,1);
    transform: translateY(2px);
    transition: all .1s ease-out;
}
</style>