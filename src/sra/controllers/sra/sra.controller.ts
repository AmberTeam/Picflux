import { Controller, Get, Query } from '@nestjs/common';
import { SraService } from '../../services/sra/sra.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('api/sra')
export class SraController {
    constructor(private readonly sraService: SraService){}

    @Get("by_hostname")
    @Public()
    async rewriteByHostname(@Query("url") url: string) {
        return this.sraService.rewriteByHostname(url);
    }
}
