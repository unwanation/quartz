import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { Separator } from "@/shared/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import Editor from "@/components/editor/editor";
import NoteBreadcrumb from "@/components/note-breadcrumb/note-breadcrumb";

export default function HomePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex gap-2 items-center h-16 shrink-0">
          <div className="flex gap-2 items-center px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NoteBreadcrumb />
          </div>
        </header>

        <main>
          <Editor />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
