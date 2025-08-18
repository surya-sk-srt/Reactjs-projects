export default function Footer(){
  return (
    <footer style={{borderTop:'1px solid var(--border)', padding:'16px', textAlign:'center', color:'var(--muted)'}}>
      <small>© {new Date().getFullYear()} NeoShop • Built with React + Vite</small>
    </footer>
  )
}