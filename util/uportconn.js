import { Connect,SimpleSigner,MNID } from 'uport-connect'
//const Connect = window.uportconnect.Connect;
const uport = new Connect('mynewreactuportapp', { clientId: '2oemXCAUK2UTnNq4gainxc7bqsjTPWpYCQ7', network: 'rinkeby' ,
                                                  signer: SimpleSigner('aa4bb6f2e86d4b8858cff25318db91b981c592600636e58a5ac2a5aacbb7336b') })


const initAccount = async () => {


    const user = await uport.requestCredentials({
        requested: ['name', 'phone', 'country'],
        notifications: true // We want this if we want to recieve credentials
    })
    // get user details
    const decodedId = MNID.decode(user.address)
    console.log('useraddress:',user.address);
    const specificNetworkAddress = decodedId.address
    /*
    uport.onResponse('disclosureReq').then(res => {
       json = JSON.stringify(res.payload)
       console.log('in uportconn',json)
       //document.querySelector('#msg').innerHTML = "Congratulations you are now `logged in`.  Here is your DID identifier:  " + json
     })
    uport.sendVerification({exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
                                 claim: {'mynewreactuportapp' : {'Last Seen' : `${new Date()}`}}
         })
         */

    return { specificNetworkAddress, user }

}



const web3 = uport.getWeb3()

export {web3, initAccount,MNID, uport}
