const{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
}=require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey
console.log(publicKey)
console.log(secretKey)

const getWalletBalance = async() => {
    try {
        const conn = new Connection(clusterApiUrl('devnet'),'confirmed')
        const walletBalance =await conn.getBalance(publicKey)
        console.log(`Balance is ${walletBalance}`)
    } catch (error) {
        console.error(err)
        
    }
}

const airDropSol = async() =>{
    try {
        const conn= new Connection(clusterApiUrl('devnet'),'confirmed')
        const fromAirDropSignature = await conn.requestAirdrop(publicKey,2*LAMPORTS_PER_SOL)
        await conn.confirmTransaction(fromAirDropSignature)
    } catch (error) {
        console.log(error)
    }
}

const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

main()


