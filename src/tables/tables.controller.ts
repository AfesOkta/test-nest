import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { Tables } from './tables.entity/tables.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua data Tables' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil mengambil data.',
    type: [Tables],
  })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil data Tables berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Tables' })
  @ApiResponse({ status: 200, description: 'Data ditemukan.', type: Tables })
  findOne(@Param('id') id: number) {
    return this.tablesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat data Tables baru' })
  @ApiBody({ type: Tables })
  @ApiResponse({
    status: 201,
    description: 'Tables berhasil dibuat.',
    type: Tables,
  })
  create(@Body() tables: Partial<Tables>) {
    return this.tablesService.create(tables);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Perbarui data Tables berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Tables' })
  @ApiBody({ type: Tables })
  @ApiResponse({
    status: 200,
    description: 'Tables berhasil diperbarui.',
    type: Tables,
  })
  update(@Param('id') id: number, @Body() tables: Partial<Tables>) {
    return this.tablesService.update(id, tables);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus data Tables berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Tables' })
  @ApiResponse({ status: 200, description: 'Tables berhasil dihapus.' })
  remove(@Param('id') id: number) {
    return this.tablesService.remove(id);
  }
}
