<template>
    <el-dropdown trigger="click">
        <span class="el-dropdown-link">
            <el-avatar :size="36"></el-avatar>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <router-link to="/username"><el-dropdown-item>Profile</el-dropdown-item></router-link>
            <!-- TODO: add route to repositories page -->
            <el-dropdown-item>Repositories</el-dropdown-item>
            <!-- TODO: add route to stars page -->
            <el-dropdown-item>Stars</el-dropdown-item>
            <!-- TODO: add route to settings page -->
            <el-dropdown-item divided>Settings</el-dropdown-item>
            <!-- TODO: sign out and redirect to sign out page -->
            <el-dropdown-item divided>Sign out</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped>
/* 
'router-view' element would be converted to 'a' element 
ref: https://stackoverflow.com/questions/44808474/vue-router-how-to-remove-underline-from-router-link
*/
a {
    text-decoration: none;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}
</style>
