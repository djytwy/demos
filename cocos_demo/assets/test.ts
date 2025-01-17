import { _decorator, Component, Node } from 'cc';
import CryptoJS from 'crypto-js';
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import * as d from 'bech32'
// import { bech32 } from 'bech32'
import b2 from 'bech32'

const { bech32 } = b2

const { ccclass, property } = _decorator;

const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});

@ccclass('test')
export class test extends Component {
    start() {
        console.log('start');
        t()
        this.te_sui()
        // this.transferSui()
        // publicMint()
    }

    update(deltaTime: number) {

    }


    async publicMint() {
        console.log('publicMint start :');
        console.log(Ed25519Keypair.fromSecretKey);
        const keypair = Ed25519Keypair.fromSecretKey("suiprivkey1qqgs38c06szddmpvnv8r7qefmep95pmahfjt5lnj0vfp308hlnjfstkezs0")
        console.log('keypair', keypair);
        const packageID = `0x5267189c9afb30c51495732ac84f09ee48027d5ebf8be62d108a6b964471b099`
        const treasuryObj = '0xc26b37054ba43a5f753518a58c078767b9e3ef465c8eceb63f8c565ec8fc1b75'
        const recipientAddress = '0x6f8c598bfc441b5b994cc8fb73be1ca08e12142a06e757c301267a629cd6dc48'

        let tx = new Transaction();
        tx.moveCall({
            target: `${packageID}::djytwy::mint`,
            // typeArguments: ['0x2::coin::CoinMetadata<0x8d455a1bceaedf212d2c37976be7dc19e301b516216b139b001df6f578b76af1::DJYTWY::DJYTWY>'],
            arguments: [tx.object(treasuryObj), tx.pure.u64(30 * 1000000000), tx.pure.address(recipientAddress)]
        })
        tx.setGasBudget(1000000000);

        try {
            let txRes = await client.signAndExecuteTransaction({
                requestType: "WaitForLocalExecution",
                transaction: tx,
                signer: keypair,
                options: {
                    showEffects: true
                }
            });
            console.log('tx', txRes);
        } catch (error) {
            console.log(error);
        }
    }

    async te_sui() {
        console.log('test sui start :');
        // @ts-ignore
        console.log(d.bech32, bech32);
        // @ts-ignore
        const _t = d.default.bech32.decode('abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw')
        console.log('decode test:', _t);
        console.log(Ed25519Keypair.fromSecretKey);
        const keypair = Ed25519Keypair.fromSecretKey("suiprivkey1qqgs38c06szddmpvnv8r7qefmep95pmahfjt5lnj0vfp308hlnjfstkezs0")
        console.log('keypair', keypair.toSuiAddress());
    }

    async transferSui() {
        const keypair = Ed25519Keypair.fromSecretKey("suiprivkey1qqgs38c06szddmpvnv8r7qefmep95pmahfjt5lnj0vfp308hlnjfstkezs0")
        const tx = new Transaction()
        const [coin] = tx.splitCoins(tx.gas, [1e8])
        tx.transferObjects([coin], '0x97419376fbc52f7d860d343394cbb42d8e048a2c536fc1fe6ab1da13c74c1f89')
        const res = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
            options: {
                showBalanceChanges: true,
                showEffects: true,
                showObjectChanges: true
            }
        })
        console.log('transferSui: ', res.digest);
    }
}


// const t = async () => {
//     const res = await axios.get('https://api.ambrus.studio/v2/account/login/nonce')
//     console.log(res.data);
// }

const t = () => {
    const hash = CryptoJS.SHA256(`!@#A$#%^&*m()br@#u$%s*1232`).toString();
    console.log(hash);
    console.log(CryptoJS);
}

const publicMint = async () => {
    console.log('publicMint start :');
    console.log(Ed25519Keypair.fromSecretKey);
    const keypair = Ed25519Keypair.fromSecretKey("suiprivkey1qqgs38c06szddmpvnv8r7qefmep95pmahfjt5lnj0vfp308hlnjfstkezs0")
    console.log('keypair', keypair);
    const packageID = `0x5267189c9afb30c51495732ac84f09ee48027d5ebf8be62d108a6b964471b099`
    const treasuryObj = '0xc26b37054ba43a5f753518a58c078767b9e3ef465c8eceb63f8c565ec8fc1b75'
    const recipientAddress = '0x6f8c598bfc441b5b994cc8fb73be1ca08e12142a06e757c301267a629cd6dc48'

    let tx = new Transaction();
    tx.moveCall({
        target: `${packageID}::djytwy::mint`,
        // typeArguments: ['0x2::coin::CoinMetadata<0x8d455a1bceaedf212d2c37976be7dc19e301b516216b139b001df6f578b76af1::DJYTWY::DJYTWY>'],
        arguments: [tx.object(treasuryObj), tx.pure.u64(30 * 1000000000), tx.pure.address(recipientAddress)]
    })
    tx.setGasBudget(1000000000);

    try {
        let txRes = await client.signAndExecuteTransaction({
            requestType: "WaitForLocalExecution",
            transaction: tx,
            signer: keypair,
            options: {
                showEffects: true
            }
        });
        console.log('tx', txRes);
    } catch (error) {
        console.log(error);
    }
}
