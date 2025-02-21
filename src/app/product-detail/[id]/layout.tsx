import DashboardLayout from '@/components/layout/Dashboard'

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
