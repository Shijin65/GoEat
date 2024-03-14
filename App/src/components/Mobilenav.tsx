import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Separator } from './ui/separator'

export default function Mobilenav() {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-orange-500' />
        </SheetTrigger>
        <SheetContent>
            <SheetTitle>
                Welcome to GoEat.com
            </SheetTitle>
            <Separator className="my-4" />
            <SheetDescription className='flex'>
                <Button className='flex-1 bg-orange-500 hover:bg-white hover:text-orange-500' >Login</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
