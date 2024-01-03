// TODO: add i18n
// TODO: add random images
export const SidebarRandomContent = [
  {
    title: 'Wir sprechen gebäudemanagement',
    description:
      'Über 10 Jahre Kommunikation und Projektmanagement mit Handwerkern, Einkäufern, Unternehmern, Beratern... zu verschiedenen Themen rund um das Gebäudemanagement.',
  },
  {
    title: 'Wir sichern ihr working capital',
    description:
      'Lange Zahlungsziele für Auftraggeber und schnelle Liquidität auf der Auftragsnehmerseite bieten für Kunden als auch für Handwerker die notwendige Flexibilität.',
  },
  {
    title: 'Wir unterstützen sie mit prozessen und vorlagen',
    description:
      'Weitreichende Standards im Sektor des Gebäudemanagements sind in unseren Workflows integraler Bestandteil.',
  },
  {
    title: 'Wir stehen für faire preise und hohe qualität',
    description:
      'Preistransparenz und bewertete Handwerker und Dienstleister sorgen nicht nur für ausgeglichenes Markangebot, sondern auch für faire Preise und bessere Qualität.',
  },
]

// function to get random number between 0 and 3
export function getRandomInt() {
  return Math.floor(Math.random() * 4)
}
