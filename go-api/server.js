const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const knex =  require('knex');
const bcrypt = require('bcryptjs');

 const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'mygo'
  }
}); 

const app = express();
app.use(bodyParser.json());
app.use(cors());


const db = {
	users: [
	  {
	  	  id:'123',
	  	  name: 'john',
	  	  email: 'john@sample.com',
	  	  pnumber: '8299699210',
	  	  password: 'cookies',
	  	  joined: new Date(),
	  	  age: '25',
	      rating:'5.0'
	  },
	  	  {
	  	  id:'124',
	  	  name: 'sally',
	  	  email: 'sally@sample.com',
	  	  pnumber: '8296773007',
	  	  password: 'banana',
	  	  joined: new Date(),
	  	  age: '25',
	      rating:'5.0'
	  }
	],
	places:[
	  {
	  	id:'223',
	  	place: 'mainolmc barbershop',
	  	email:'john@gmail.com',
	  	pnumber: '8092340000',
	  	address: {
	  		street: '52 circunvalacion st',
	  		town: 'haina',
	  		province: 'sancristobal'

	  	}, 
	  	   workers:{
	      	id:'324',
	       	name:'mainol ramirez',
	       	age: '25',
	       	rating:'5.0'
	       },
	  	password: 'cookies',
	  	opens:'from 8 A.M to 7 P.M'


	  },

	  	  {
	  	id:'224',
	  	place: 'salon 1',
        email: 'salon1@sample.com',
        pnumber: '8092340001',
	  	address: {
	  		street: '55 circunvalacion st',
	  		town: 'haina',
	  		province: 'sancristobal'

	  	}, 
	    workers:{
       	id:'323',
       	name:'nani ramirez',
       	age: '23',
       	rating:'5.0'
       },
	  	password: '123456',
	  	opens:'from 8 A.M to 7 P.M'


	  }

   ],
  
   turns:[
   
	   	{value: 'melvin', id: 0},
		{value: 'mainol', id:1},
		{value: 'chino', id:2},
		{value: 'manuel', id:3},
		{value: 'eddie', id:4}
	   	
   ],

   userpick:{

   type:[

        	{value: 'Haircut', id: 0},
        	{value: 'Shape-up', id:1},
       		{value: 'Eyebrow', id:2},
        
        ],

    vip:[
        
        	{value: 'Adult', id: 0},
        	{value: 'Minor', id:1},

        
        ],

        being:[
       
        	{value: 'VIP $300', id: 0},
        	{value: 'Normal', id:1}
        
        ]

    },

    info:[]


}

app.get('/', (req, res) =>{
	res.json(db.users)
})

app.get('/turns', (req, res) =>{
	pg.select('*').from('turns')
	.then( data => res.json(data))
	
})
app.post('/signin/user', (req, res) => {
	pg.select('email',  'pwd').from('login')
	.where('email', '=', req.body.email)
	.then(data =>{
		const isValid = bcrypt.compareSync(req.body.password, data[0].pwd);
		if(isValid){
			return pg.select('*').from('users')
			.where('email', '=', req.body.email)
			.then(user=> {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		}

	})
    .catch(err => res.status(400).json('wrong password'))
})

app.post('/signin/place', (req, res) => {
     pg.select('email', 'pwd').from('loginplace')
     .where('email', '=', req.body.email)
     .then(data =>{
       const isValid  = bcrypt.compareSync(req.body.password, data[0].pwd);
       if(isValid){
       	return pg.select('*').from('places')
       	.where('email', '=', req.body.email)
       	.then(user =>{
       		res.json(user[0])

       	})
      		.catch(err => res.status(400).json('unable to get user'))

       }
     })
         .catch(err => res.status(400).json('wrong password'))

})

app.post('/register/user', (req, res) => {
	const { email, name, pnumber, password } = req.body;
	const hash  = bcrypt.hashSync(password);
	 pg.transaction(trx =>{
		trx.insert({
			email:email,
			pwd: hash
		})
		.into('login')
	    .returning('email')
    	.then(loginemail =>{
		  return trx('users')
		  .returning('*')
		  .insert({
	  	  name: name,
	  	  email: loginemail[0],
	  	  pnumber: pnumber,
	  	  joined: new Date()

	})
	 .then(user =>{
	  res.json(user[0]);

	      });
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})

    .catch(err=> res.status(400).json('unable to register'))
})


app.post('/register/place', (req, res) => {
	const { email, name, pnumber, password } = req.body;
	const hash  = bcrypt.hashSync(password);
	pg.transaction(trx =>{
		trx.insert({
			email:email,
			pwd: hash
		})
		.into('loginplace')
		.returning('email')
		.then(loginemail =>{
			return trx('places')
			.returning('*')
			.insert({
				placename: name,
		        email: loginemail[0],
		        pnumber: pnumber

			})
			.then(placeuser =>{
				res.json(placeuser[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json(err))

})

app.post('/register/place/worker', (req, res) => {
	const {  name, age, rating } = req.body;

	pg('workers').insert({
	  	  name: name,
	  	  age: age,
	  	  rating: rating

	}).then(console.log)

	res.json('worked') 
})

app.post('/addturns', (req, res) => {
	const  { turn, barber } = req.body;
	pg.insert({
		name: turn,
		barber: barber
	}).into('turns')
	.returning('*')
	.then(data => {
		console.log(data)
		return pg.select('*').from('turns')
		.then(turns => res.json(turns))
	})
})

app.post('/deleteturns', (req,  res) =>{
	const toDeleteTurn = req.body.toDeleteTurn;
	pg.transaction(trx =>{
      trx('turns').where('name', toDeleteTurn).del()
	.returning('*').then(name =>{
		return trx('info').where('userinfo', toDeleteTurn).del()
	}).then(data => {
		return trx.select('*').from('turns')
		.then(turns => res.json(turns))
	})
	   		.then(trx.commit)
		.catch(trx.rollback)
	})
	
})

app.get('/type',  (req, res) => {
	pg.select('*').from('type').then(data =>{
	res.json(data)
	});
})


app.get('/being',  (req, res) => {
	pg.select('*').from('being').then(data =>{
	res.json(data)
	});
})


app.get('/vip',  (req, res) => {
	pg.select('*').from('vip').then(data =>{
	res.json(data)
	});
})

app.post('/wanteddata' , (req, res) => {
	const { userInfo, typeInfo, beingInfo, vipInfo, descriptionInfo, emailInfo, barber} = req.body;
	pg.transaction(trx =>{
		trx.insert({
			name: userInfo,
			barber: barber
		}).into('turns').returning('name')
		.then(turnsname =>{
			return trx('info')
			.returning('*')
				.insert({
					barber: barber,
					emailinfo: emailInfo,
					userinfo: turnsname[0],
					typeinfo: typeInfo,
					beinginfo: beingInfo,
					vipinfo: vipInfo,
					descriptioninfo: descriptionInfo
	})
		.then(data => {
			return res.json(data)})
		           console.log(data);
		})


      		.then(trx.commit)
		.catch(trx.rollback)
      
	}) 
     	.catch(err => res.status(400).json(err))


})

app.get('/infoWanted/infosend',  (req, res) => {
	pg.select('*').from('info')
	.then(data => res.json(data))
})

app.post('/workers', (req, res) => {
	const placename = req.body.placename;
	console.log(placename)
	pg.select('*').from('workers').where('placename', '=', placename)
	.then(data => {
		console.log(data)
		res.json(data)
	})
})

app.get('/worker/name',  (req, res) =>{
	pg.select('*').from('workers').then(data => res.json(data))
})

app.listen(3001)