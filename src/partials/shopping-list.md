<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    
    <link rel="stylesheet" href="../sass/elements/_shopping-list.scss" />
    <!-- <link rel="stylesheet" href="../sass/elements/_modal-pop_up.scss"> -->
    <link rel="stylesheet" href="../sass/index.scss" />
    <link rel="shortcut icon" href="../favico/logo.svg" type="image/x-icon" />
  </head>
  <body class="">

    <header>
      <a href="../index.html" class="logo">
        <svg class="logo-icon" width="22" height="22">
          <use href="../images/svg-sprite.svg#booklogo-icon"></use>
        </svg>
        <svg class="logo-text" width="53" height="17">
          <use href="../images/svg-sprite.svg#booklogo-book"></use>
        </svg>
      </a>
      <nav class="nav">
        <ul class="nav__list list">
          <li class="nav-item">
            <a href="../index.html" class="nav__link link"> Home</a>
          </li>
          <li class="nav-item nav-active">
            <a href="./shopping-list.html" class="nav__link active link">
              Shopping list
              <svg class="header__link-icon" width="20" height="20">
                <use href="../images/svg-sprite.svg#bag"></use>
              </svg>
            </a>
          </li>
        </ul>
        <!-- <nav>
        <input type="checkbox" name="checkbox" class="theme-switch" /> -->
      </nav>

      <input
        type="checkbox"
        name="checkbox"
        id="theme-switch"
        class="theme-switch"
      />

      <button
        class="menu-toggle js-open-menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <svg class="header__mobile-menu" width="28" height="28">
          <use
            class="menu-icon"
            id="menu-icon"
            href="../images/svg-sprite.svg#ham-menu-icon"
          ></use>
        </svg>
      </button>
      <button type="button" class="btn-default header__singup-btn">
        Sign up<svg class="header__singup-icon" width="20" height="20">
          <use href="../images/svg-sprite.svg#arrow-right-icon"></use>
        </svg>
      </button>
      <!-- <button type="button" class="btn-default header__singin-btn">
        <svg class="header__singin-icon" width="19" height="19">
          <use href="./images/svg-sprite.svg#user-default-icon"></use>
        </svg>
        Stephen
        <svg class="header__singin-down-icon" width="23" height="26">
          <use href="./images/svg-sprite.svg#user-arrow-down-icon"></use>
        </svg>
      </button> -->
    </header>
    <main>
      <div class="shopping-list__container">
        <!-- <section class="shopping-list__support">
          <h2>Support Ukraine</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            quis eveniet fugit tempore cum aperiam architecto repellat
            asperiores reiciendis, perspiciatis, veniam dicta. Ipsa asperiores
            deserunt commodi iste autem placeat in?
          </p>
        </section> -->


        <section class="support-ukraine">
          <!-- <h2 class="support-ukraine__title">
            <span class="support-title-container">
              Support Ukraine
              <svg class="logo-ukr" width="20" height="32">
                <use href="../images/svg-sprite.svg#ukraine-arms"></use>
              </svg>
            </span>
          </h2>
          <ul class="support-companies"></ul>
          <button type="button" class="support__load-more">
            <svg class="button__icon" width="64" height="64">
              <use href="../images/svg-sprite.svg#arrow-down-icon"></use>
            </svg>
          </button> -->
        </section>
        <section class="shopping-list__page">
          
          <h1 class="shopping-list__title" data-text="list">shopping list</h1>

          <ul class="check shopping-list"></ul>
          
          <ul class="btn-pagination__list"></ul>

          
          
        </section>
      </div>
      
    </main>
    
    <a href="../index.html">Main page</a>

    <!-- <button class="btn-tg toggle__add">Add/Remove</button> -->

     <script src="../js/shopping-list.js" type="module"></script>
    <!-- <script src="../js/delete-just-to-check-card.js" type="module"></script> -->
    <!-- <script src="../index.js" type="module"></script> -->
  </body>
</html>
