/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DB_URL:'mongodb+srv://shahid123:shahid123@cluster0.ciqpaax.mongodb.net/',
    API_URL:"https://ecommerce-iota-henna-37.vercel.app",
    CLOUD_NAME: "dnvykpdlo",
    CLOUDINARY_API_KEY: "264966254412949",
    CLOUDINARY_API_SECRET: "oBepswHk17zfn0GAQmMAQsqr8U4",
    NEXTAUTH_SECRET:"coding",
    STRIPE_PUBLIC_KEY: "pk_test_51Np8LVSJO1ZZV7ezQo86PEQJD0w2wWi5BtnjKNUMyjz5yrJDrNzks8tWpPpThKjdfieeikQuGYqOcHFQP8gTPeH800NUaetTSO",
    STRIPE_PRIVATE_KEY: "sk_test_51Np8LVSJO1ZZV7ezXztwxc33RRu9bGfs1KkXJZnYzG1dmUCchb7Uow8z6FfskK6gf5CgivgZmoLOKm2lH5Fb86Cz00RGVo8Kgo",
    STRIPE_WEBHOOK_SECRET:"whsec_47b003f38b425fde905b48e0d9d7d15b6377a2f3054857a08364647bdd17fa20",
  },
  images:{
    domains:['res.cloudinary.com','encrypted-tbn0.gstatic.com']
  },
}

module.exports = nextConfig
