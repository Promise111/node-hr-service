import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { delay } from '../common/utils/delay.util';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  /**
   * Find an employee by email address
   * Simulates an external service call with a random delay (200-500ms)
   * @param email - Employee email address
   * @returns Employee data or null if not found
   */
  async findByEmail(email: string): Promise<EmployeeResponseDto | null> {
    try {
      // Simulate delay for external service call (200-500ms)
      await delay(200, 500);

      const employee = await this.employeeRepository.findOne({
        where: { email },
      });

      if (!employee) {
        return null;
      }

      // Transform entity to response DTO
      return {
        full_name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        department: employee.department,
        salary: Number(employee.salary),
      };
    } catch (error) {
      // Log error for debugging (in production, use proper logging service)
      console.error('Error fetching employee:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching employee data',
      );
    }
  }
}

