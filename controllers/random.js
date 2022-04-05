import fetch from 'node-fetch'

async function getOne(req,res) {
    try{

        const result = await fetch('https://api.scryfall.com/cards/random')
        const data = await result.json()

        res.status(200).json({acction:'get one', data})

    }catch(err){
        console.log(err)
        res.status(500).json({acction:'get one', messaje:'error'}) 
    }

}

export { getOne }