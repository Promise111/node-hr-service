import {
  Controller,
  Get,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * GET /api/employees/:email
   * Fetch employee data by email address
   * @param email - Employee email address
   * @returns Employee data
   * @throws NotFoundException if employee not found
   */
  @Get(':email')
  @HttpCode(HttpStatus.OK)
  async getEmployeeByEmail(
    @Param('email') email: string,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.employeesService.findByEmail(email);

    if (!employee) {
      throw new NotFoundException(
        `Employee with email ${email} not found`,
      );
    }

    return employee;
  }
}

