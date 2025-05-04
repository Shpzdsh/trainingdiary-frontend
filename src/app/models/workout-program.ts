export interface WorkoutProgram {
  id: number;
  name: string | null;
  description: string | null;
  userId: number | null;
  isPublic: boolean | null;
}

export interface WorkoutProgramDto {
  name: string;
  description: string;
  isPublic: boolean;
  userId?: number;
}
