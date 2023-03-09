#E-commerce App with Next JS and Sanity 
I created an E-commerce app for selling headphones.  
The app is created with the following technologies: CSS, ReactJS, NextJS, Sanity, Stripe, Confetti.  
In Sanity backend I have created 2 Schemas , one for the product and one for the banner.  
In my frontend part I'm using ReactJS with NextJS for implementing also an API where processing the Cart Items to the Stripe to redirect me to the built-in Stripe page where I can add the fake Stripe Credit cart 4242 4242 4242 4242 and for MM/YY add 04/24 and for the CVC just add 424, add random name on card and click Pay, then we are going to redirect in the success page where Confetti canvas is displayed with fireworks, then we can continue shopping.  
I'm using react context for storing the data in the app wide store.  
I'm storing my Sanity token and Stripe keys in env file to protect it for showing in the browser.  
I have created a dynamic page for the products, i recognize them by their slug property in the Sanity database. In the getStaticProps method I'm fetching the product
with that slug and also the other products to make the "You may also like" section.  
This App is made for learning NextJS, Sanity and Stripe !  
You can check the app hosted live on Vercel here:  https://headphones-e-commerce.vercel.app  
You can see, edit, modify, add the products or the banner in my sanity online studio hosted here: https://headphones-ecommerce-aleksandro.sanity.studio/desk  
