// NeonKey: concept catalogue. Fictional store; the platforms are the real gift cards such a shop resells.
// Prices are TT$ for the face value in US$ (the ladder T&T resellers use), so customers see the final price up front.
window.WA = '18682591409';
const LADDER = { 10: 90, 15: 135, 20: 180, 25: 220, 30: 255, 35: 285, 40: 350, 45: 380, 50: 410, 60: 465, 65: 510, 70: 540, 75: 580, 80: 610, 90: 700, 99: 755, 100: 760 };
const usd = list => list.map(v => ({ label: `US$${v}`, value: v, ttd: LADDER[v] }));

window.CARDS = [
  { id: 'psn', name: 'PlayStation Store', short: 'PSN', cat: 'console', c1: '#0B3D91', c2: '#00439C', c3: '#2B8CFF', glyph: 'ps',
    blurb: 'Games, add-ons and PlayStation Plus for PS5 and PS4.', region: 'US account', denoms: usd([10, 25, 30, 50, 60, 70, 100]),
    redeem: ['Open PlayStation Store on your console or the PS App', 'Select your avatar → Redeem codes and gift cards', 'Enter the 12-character code from NeonKey', 'Funds land in your wallet instantly'], hot: true },
  { id: 'xbox', name: 'Xbox', short: 'Xbox', cat: 'console', c1: '#0E5A0E', c2: '#107C10', c3: '#4CC94C', glyph: 'xbox',
    blurb: 'Games, Game Pass and DLC on Xbox Series X|S, One and PC.', region: 'US account', denoms: usd([10, 15, 20, 25, 30, 50, 60, 70, 100]),
    redeem: ['Press the Xbox button → Store', 'Choose Redeem from the menu', 'Type the 25-character code', 'Confirm and your balance updates'], hot: true },
  { id: 'nintendo', name: 'Nintendo eShop', short: 'Nintendo', cat: 'console', c1: '#B0000E', c2: '#E60012', c3: '#FF5A5F', glyph: 'switch',
    blurb: 'Switch games, DLC and Nintendo Switch Online.', region: 'US account', denoms: usd([10, 20, 35, 45, 50, 65, 70, 99]),
    redeem: ['Open Nintendo eShop on your Switch', 'Pick your user → Redeem Code', 'Enter the 16-character code', 'Funds are added to your eShop balance'] },
  { id: 'vbucks', name: 'Fortnite V-Bucks', short: 'V-Bucks', cat: 'games', c1: '#3A1C9C', c2: '#6A3DF0', c3: '#24C8FF', glyph: 'v',
    blurb: 'V-Bucks for skins, emotes and the Battle Pass, on any platform.', region: 'Any platform',
    denoms: [{ label: '1,000 V-Bucks', value: 1000, ttd: 90 }, { label: '2,800 V-Bucks', value: 2800, ttd: 200 }, { label: '5,000 V-Bucks', value: 5000, ttd: 305 }, { label: '13,500 V-Bucks', value: 13500, ttd: 730 }],
    redeem: ['Go to fortnite.com/vbuckscard', 'Sign in to your Epic Games account', 'Enter the code and confirm the platform', 'V-Bucks appear next time you launch Fortnite'], hot: true },
  { id: 'roblox', name: 'Roblox', short: 'Roblox', cat: 'games', c1: '#1B1B1F', c2: '#33343A', c3: '#E2231A', glyph: 'roblox',
    blurb: 'Robux and Premium for every Roblox experience.', region: 'Global', denoms: usd([10, 15, 20, 25, 30, 40, 50, 60, 75, 100]),
    redeem: ['Go to roblox.com/redeem and log in', 'Enter the PIN from your NeonKey code', 'Tap Redeem: credit or Robux is added', 'Spend it in the Avatar Shop or any game'], hot: true },
  { id: 'freefire', name: 'Free Fire Diamonds', short: 'Free Fire', cat: 'games', c1: '#7A1F00', c2: '#FF6A00', c3: '#FFC233', glyph: 'diamond',
    blurb: 'Diamond top-ups straight to your Free Fire ID.', region: 'Player ID top-up',
    denoms: [{ label: '110 Diamonds', value: 110, ttd: 15 }, { label: '341 Diamonds', value: 341, ttd: 40 }, { label: '572 Diamonds', value: 572, ttd: 65 }, { label: '1,166 Diamonds', value: 1166, ttd: 130 }, { label: '2,398 Diamonds', value: 2398, ttd: 255 }],
    redeem: ['Enter your Free Fire Player ID at checkout', 'We top up directly. No code to type', 'Diamonds arrive in-game in a few minutes', 'Check your mailbox in the lobby'] },
  { id: 'razer', name: 'Razer Gold', short: 'Razer Gold', cat: 'games', c1: '#0A0A0A', c2: '#161616', c3: '#44D62C', fg: '#44D62C', glyph: 'razer',
    blurb: 'Whatever you play: PUBG, Valorant, MLBB and 2,000+ games.', region: 'Global', denoms: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => ({ label: `US$${v}`, value: v, ttd: v === 20 ? 170 : v === 80 ? 620 : LADDER[v] })),
    redeem: ['Log in at gold.razer.com', 'Choose Reload → Razer Gold PIN', 'Enter your PIN and confirm', 'Use Razer Gold at checkout in your game'] },
  { id: 'apple', name: 'Apple Gift Card', short: 'Apple', cat: 'apps', c1: '#2A2A2E', c2: '#4A4A50', c3: '#D9D9DE', glyph: 'apple',
    blurb: 'App Store, iCloud+, Apple Music and more.', region: 'US Apple ID', denoms: usd([25, 30, 40, 50, 60, 70, 80, 90, 100]),
    redeem: ['Open the App Store and tap your photo', 'Tap Redeem Gift Card or Code', 'Enter the code manually', 'Balance shows under your Apple ID'] },
  { id: 'amazon', name: 'Amazon', short: 'Amazon', cat: 'shopping', c1: '#131A22', c2: '#232F3E', c3: '#FF9900', fg: '#FF9900', glyph: 'amazon',
    blurb: 'Shop anything on Amazon.com and ship it with your courier.', region: 'Amazon.com', denoms: usd([10, 20, 30, 40, 50, 60, 70, 80, 100]),
    redeem: ['Go to amazon.com/redeem', 'Sign in and enter the claim code', 'Tap Apply to your balance', 'It is used automatically at checkout'] },
  { id: 'netflix', name: 'Netflix', short: 'Netflix', cat: 'apps', c1: '#2A0003', c2: '#0F0F0F', c3: '#E50914', fg: '#E50914', glyph: 'n',
    blurb: 'Pay for Netflix without a credit card.', region: 'US account', denoms: usd([25, 30, 50, 60, 100]),
    redeem: ['Go to netflix.com/redeem', 'Enter the PIN from the card', 'Sign in or create your account', 'Months are added to your plan'] },
  { id: 'shein', name: 'SHEIN', short: 'SHEIN', cat: 'shopping', c1: '#111', c2: '#2A2A2A', c3: '#F5F5F5', glyph: 'shein',
    blurb: 'Fashion haul money. No card needed at checkout.', region: 'US site', denoms: usd([25, 50, 75, 100]),
    redeem: ['Open SHEIN and go to Me → Gift Card', 'Enter the card number and PIN', 'Bind it to your account', 'Apply it on your next order'] },
];
window.CATS = [['all', 'All cards'], ['console', 'Consoles'], ['games', 'In-game'], ['apps', 'Apps & TV'], ['shopping', 'Shopping']];

// fake-but-believable social proof (concept only)
window.FEED = [
  ['Kyle · Arima', 'psn', 'US$50'], ['Shania · San Fernando', 'shein', 'US$50'], ['Jaden · Chaguanas', 'vbucks', '2,800 V-Bucks'], ['Aaliyah · Couva', 'roblox', 'US$25'],
  ['Marcus · Tunapuna', 'xbox', 'US$25'], ['Renee · Point Fortin', 'netflix', 'US$30'], ['Josiah · Diego Martin', 'freefire', '572 Diamonds'], ['Kezia · Sangre Grande', 'apple', 'US$25'],
  ['Andre · Princes Town', 'nintendo', 'US$35'], ['Tariq · St. Augustine', 'razer', 'US$20'], ['Nia · Scarborough', 'amazon', 'US$100'], ['Liam · Penal', 'psn', 'US$100'],
];
window.REVIEWS = [
  ['Code came in like 4 minutes after I sent the transfer. Bought V-Bucks for my son, no stress.', 'Michelle R.', 'Chaguanas'],
  ['Best PSN prices in TT, and I can actually see the price before I message anybody.', 'Kyle B.', 'Arima'],
  ['Paid with Republic online banking, uploaded the slip, code reached my WhatsApp. Legit.', 'Shania M.', 'San Fernando'],
  ['Bought a Roblox card for a birthday gift and it came with the redeem steps. Easy.', 'Darren P.', 'Couva'],
];
