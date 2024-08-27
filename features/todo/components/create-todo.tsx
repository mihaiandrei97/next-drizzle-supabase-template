'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { LoaderButton } from '@/components/LoaderButton';
import { useToast } from '@/components/ui/use-toast';
import { createTodoAction } from '../actions';

const todoSchema = z.object({
    text: z.string().min(1, 'Text is required'),
});

export function CreateTodoButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const [pending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            text: '',
        },
    });

    function onSubmit(values: z.infer<typeof todoSchema>) {
        startTransition(() => {
            createTodoAction(values)
                .then(() => {
                    setIsOpen(false);
                    toast({
                        title: 'Todo added',
                        description: 'Your todo has been created',
                    });
                })
                .catch((e) => {
                    toast({
                        title: 'Something went wrong',
                        description: e.message,
                        variant: 'destructive',
                    });
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Todo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4 text-2xl">Create a Todo</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoFocus />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant={'secondary'}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <LoaderButton isLoading={pending}>Create</LoaderButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
