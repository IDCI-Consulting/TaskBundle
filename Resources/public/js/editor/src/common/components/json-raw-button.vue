<template>

    <div>
        <i class="fa fa-file-code-o json-raw-button" aria-hidden="true" @click="openModal()"></i>
        <modal v-if="showModal">
            <button type="button" class="close" slot="header" @click="closeModal()">×</button>
            <h3 slot="header">{{ header }}</h3>
            <textarea readonly slot="body" class="raw-json">{{ body }}</textarea>
            <p slot="footer">{{ footer }}</p>
        </modal>
    </div>

</template>

<style>
.vue-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.vue-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.vue-modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.vue-modal-body {
    margin: 20px 0;
    width: 100%;
}

.vue-modal-container .vue-modal-body textarea.raw-json {
    min-height: 300px;
    min-width: 100%;
    max-width: 100%;
}

.vue-modal-container .close {
    position: absolute;
    top: 5px;
    right: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .vue-modal-container,
.modal-leave-active .vue-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.json-raw-button {
    cursor: pointer;
    display: block;
    font-size: 20px;
    margin-bottom: 20px;
    padding: 10px 10px 0;
    text-align: right;
    z-index: 20;
}

.json-raw-button:hover {
    color: #514D61;
}
</style>

<script>

import {
    modalComponent
} from 'vue-editor-commons';

export default {
    props: ['header', 'body', 'footer'],

    data: function () {
        return {
            showModal: false
        };
    },

    components: {
        'modal': modalComponent,
    },

    methods: {
        openModal: function () {
            this.showModal = true;
        },

        closeModal: function () {
            this.showModal = false;
        }
    }
};

</script>
