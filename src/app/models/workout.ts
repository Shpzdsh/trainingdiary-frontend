export interface Workout {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  programId: number;
}

export interface WorkoutDto {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  programId: number;
}
