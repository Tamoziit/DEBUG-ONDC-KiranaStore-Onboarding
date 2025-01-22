# DEBUG-ONDC-KiranaStore-Onboarding

## Bandhan Kirana

_Bandhan Kirana proposes to simplify anddecentralize the onboarding process for Kiranastores through a self-onboarding platform._

# Application Walkthrough

## Bandhan Kirana: Seller Application

**Home Page**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/nDo6359Q.png">

**Auth Page**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/kGX1826FXw.png" alt="Image 1">
<img src="https://i.imghippo.com/files/DIdY3177I.png" alt="Image 2">

**Warehouse: Explore & Register Store**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/Qa2174k.png">

**Registered Stores of Owners**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/BqAI6717l.png">

**Store Management**
<img  style="margin-top: 13px" src="https://i.imghippo.com/files/OFnG8769pU.png" alt="Image 1">
<img src="https://i.imghippo.com/files/Dso7603Cpo.png" alt="Image 2">

**Inventory Management**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/Nqvu8686oYc.png">

**Warehouse which the Owner is registered to**
<img style="margin-top: 13px" src="https://i.imghippo.com/files/Gmgb1487M.png">

## ONDC-connected Buyer Apps where the products are broadcasted (simulation)

<img src="https://i.imghippo.com/files/px4982KA.png">

## Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB
- Redis
- Stripe
- Typescript

**Frontend**

- React.js
- Axios
- TailwindCSS
- Chart.js
- Cloudinary
- Typescript + Javascript

## Getting Started

1. Clone the repository

```
    git clone https://github.com/Tamoziit/DEBUG-ONDC-KiranaStore-Onboarding.git
```

2. Set up the Seller App

```
    cd backend
    npm i
    cd frontend
    npm i
```

3. Start the Seller App

```
    cd backend
    npm run dev
    cd frontend
    npm run dev
```

4. Set up & start the Buyer Applications (optional, only if you want to explore the ONDC network simulation)

```
    cd buying-web/buyer-3
    npm i
    npm run dev
```

5. Navigate to http://localhost:5173 to access Bandhan Kirana Seller App.
6. Navigate to http://localhost:5174 to access the Buyer App simulation.
