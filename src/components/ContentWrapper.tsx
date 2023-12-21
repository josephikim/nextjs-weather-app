import classes from 'styles/sass/ContentWrapper.module.scss'

interface ContentWrapperProps {
  children?: React.ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => (
  <div className={classes.content}>{children}</div>
)

export default ContentWrapper
