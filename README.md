# NeonKey — concept digital game-card store

An online store for **NeonKey**, a fictional Trinidad & Tobago seller of digital game cards and gift codes: PlayStation, Xbox, Nintendo, Fortnite V-Bucks, Roblox, Free Fire diamonds, Razer Gold, Apple, Amazon, Netflix and SHEIN.

Concept build by **Portside Digital**. NeonKey is not a real business. Card names belong to their owners. The card art is original (no brand logos), and the four gear photos are from [Unsplash](https://unsplash.com).

**Pages**
- `index.html`: 3D card-stack hero with a typing "code sent" pill, instant search (understands "robux", "ps5", "fortnite"…), category filters, three-step "Zero DMs" explainer, a US$→TT$ price-check slider, DMs-vs-NeonKey comparison, gaming gear with a 25% deposit, reviews.
- `card.html?id=…`: amount picker with the TT$ price shown instantly, quantity, region note, Free Fire player-ID top-up, redeem steps, sticky mobile buy bar.
- `checkout.html`: details, then online banking (bank picker, account number, amount and a unique order reference, all with copy buttons, plus proof-of-payment upload), card via WiPay, or WhatsApp. Then review and place the order.
- `track.html`: live status timeline (placed → payment received → verified → code delivered), tap-to-reveal codes with copy and redeem guides.
- `owner.html`: the owner's dashboard. Payments to verify with the slip and automatic amount/reference matching, one-tap "Verify & send code", code stock with low-stock alerts and "Add codes", 7-day sales and best sellers. New orders arrive every 30 s for the demo.
- `help.html`: how it works, redeem guides for every card, policies, FAQ.

No real orders are placed and no payments are taken. Codes are generated demo strings that start with `DEMO`. All data stays in the visitor's browser (localStorage).
