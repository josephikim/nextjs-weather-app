import Header from 'components/Header'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <div className="Layout">
    <Header />
    <div className="Content">{children}</div>
  </div>
)

export default Layout
