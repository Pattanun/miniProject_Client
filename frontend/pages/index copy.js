// import Head from 'next/head' 
// import Layout from '../components/layout' 
// import Navbar from '../components/navbar'
// import styles from '../styles/Home.module.css'

// export default function Home({ token }) {
 
//   return (
//     <Layout>
//     <Head>
//         <title>First Page</title>
//     </Head>
//     <div className={styles.container}>
//         <Navbar />
//         <div>
//         <h1>Welcome to Guitar shop</h1>
//         </div>
//     </div>
// </Layout>
//   )
// }

// export function getServerSideProps({ req, res }) {
//   // console.log("token from cookie: ",cookie.get("token")) 
//   // console.log('req: ', req.headers)
//   return { props: { token: req.cookies.token || "" } };
// }