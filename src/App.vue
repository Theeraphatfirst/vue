<template>
  <div id="app">
  <div id="nav">
  
  <b-navbar toggleable="lg" type="dark" variant="dark ">
  <b-navbar-brand to="/">Home</b-navbar-brand>
  

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/api">API</b-nav-item>
      </b-navbar-nav>         
    </b-collapse>
  </b-navbar>   
    <router-view/></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #269bbe;
   padding: 10px;
   font-size: 20px;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #dfb93c;

    &.router-link-exact-active {
      
      
      color: #ffffff;
    }
  }
}
</style>
