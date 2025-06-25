# ZINTAK CARD PAY

A web app for Gmail-to-Gmail virtual money transfer with admin panel.

## Features

- Google Sign-In for all users
- Send money (virtual balance) to any Gmail-registered user
- Transaction history for all users
- Admin panel for balance adjustment

## Setup

1. Clone this repo
2. Run `npm install`
3. Add your Firebase project config in `src/firebase.js` (already present)
4. Update Firestore rules as given in `firestore.rules`
5. Run `npm start`

## Firebase Rules (Important!)

Check `firestore.rules` for secure access!

## License

MIT