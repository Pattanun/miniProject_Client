import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    // const loginForm = () => (
    //     <div className={styles.gridContainer}>


    //     </div>
    // )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Navbar />

            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <div class="mb-4 ">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <div class="flex items-center justify-center">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={login}>
                            Sign In
                        </button>
                        
                    </div>
                    <div>
                   Status:  {status}
                 </div>
                </form>

            </div>
        </Layout>
    );
}

//     return (
//         <body>
//             <Navbar />

//             <h1>Login</h1>
//                 <div><b>Token:</b> {token.substring(0, 15)}...
//                 <button onClick={copyText}> Copy token </button>
//                 </div>
//                 <br/>
//                 <div>
//                     Status:  {status}
//                 </div>
//                 <br />
//                 {loginForm()}
//                 <div>
//                     <button onClick={login}>Login</button>
//                 </div>
//         </body>

//     )
// }

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
