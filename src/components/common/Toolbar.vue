<template>
    <div class="flex flex-wrap relative box-border items-center">
        <div class="flex">
            <slot name="left"></slot>
        </div>
        <div class="flex items-center flex-auto justify-end">
            <slot name="right"></slot>
        </div>
    </div>
</template>
