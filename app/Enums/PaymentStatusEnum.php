<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case pending = 'pending';

    public function label(): string
    {
        return match ($this) {
            static::pending => 'Pending',
        };
    }
}
