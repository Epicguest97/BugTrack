
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Palette, Globe, Shield, Database } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-mono font-bold text-foreground mb-2">SETTINGS</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-lg font-mono font-semibold">Profile</h2>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="font-mono">First Name</Label>
                <Input id="firstName" defaultValue="John" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="font-mono">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="font-mono" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@company.com" className="font-mono" />
            </div>
            
            <Button className="w-fit font-mono">Save Profile</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-mono font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Issue Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when issues are updated</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Project Activity</Label>
                <p className="text-sm text-muted-foreground">Notifications for project activities</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5" />
            <h2 className="text-lg font-mono font-semibold">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-mono">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-48 font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="font-mono">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="w-48 font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg font-mono font-semibold">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" className="font-mono">Enable</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Activity Logging</Label>
                <p className="text-sm text-muted-foreground">Log user activities for security</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5" />
            <h2 className="text-lg font-mono font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono">Export Data</Label>
                <p className="text-sm text-muted-foreground">Download your project data</p>
              </div>
              <Button variant="outline" size="sm" className="font-mono">Export</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-mono text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your account</p>
              </div>
              <Button variant="destructive" size="sm" className="font-mono">Delete</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
