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

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Navbar />
            <div >
                <div class=" flex justify-center mt-20">
                    <div class="H-20 w-30 rounded overflow-hidden shadow-lg">
                        <form class="bg-black rounded shadow-md rounded px-10 pt-15 pb-8 mb-15 ">
                            <div class="mb-4">{loginForm()}</div>
                            <div class="mb-6">
                                <p class="text-slate-200">
                                    <br></br>
                                </p>
                                {status}

                                <div>

                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <button
                                    class="bg-white text-black-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={login}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
